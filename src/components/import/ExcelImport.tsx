import { useState } from 'react';
import * as XLSX from 'xlsx';
import { FileInput, FileSpreadsheet, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

type ImportProps = {
  onDataImport: (data: any[]) => void;
  templateFields?: string[];
  category: 'inventory' | 'customers' | 'sales';
};

const ExcelImport = ({ onDataImport, templateFields = [], category }: ImportProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { theme } = useTheme();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
      'application/vnd.ms-excel', // xls
      'text/csv' // csv
    ];

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid Excel or CSV file');
      return;
    }

    setFileName(file.name);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Validate data structure if templateFields provided
        if (templateFields.length > 0) {
          const firstRow = jsonData[0] as Record<string, any>;
          const missingFields = templateFields.filter(
            field => !Object.keys(firstRow).includes(field)
          );

          if (missingFields.length > 0) {
            toast.error(`Missing required fields: ${missingFields.join(', ')}`);
            setIsProcessing(false);
            return;
          }
        }

        // Success - send data to parent component
        toast.success(`Successfully imported ${jsonData.length} ${category} records`);
        onDataImport(jsonData);
      } catch (error) {
        console.error('Error processing file:', error);
        toast.error('Error processing file. Please check the format and try again.');
      }
      setIsProcessing(false);
    };

    reader.onerror = () => {
      toast.error('Error reading file');
      setIsProcessing(false);
    };

    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    if (templateFields.length === 0) {
      toast.error('Template not available');
      return;
    }

    // Create a workbook with template fields as headers
    const wb = XLSX.utils.book_new();
    const wsData = [templateFields];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    
    // Generate and download the file
    XLSX.writeFile(wb, `${category}_import_template.xlsx`);
    toast.success('Template downloaded');
  };

  return (
    <Card className={theme === 'dark' ? 'blue-glow' : 'dashboard-card-glow'}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileSpreadsheet className="mr-2 h-5 w-5" />
          Import {category.charAt(0).toUpperCase() + category.slice(1)} Data
        </CardTitle>
        <CardDescription>
          Upload Excel or CSV files to import {category} data into the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <div className="rounded-full bg-primary/10 p-3">
              <Upload 
                className="h-8 w-8 text-primary" 
                aria-hidden="true"
              />
            </div>
            
            {fileName ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <p className="text-sm font-medium">Selected file:</p>
                <p className="text-primary font-semibold">{fileName}</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center space-y-1">
                  <p className="text-base font-medium">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Excel or CSV files (max 10MB)
                  </p>
                </div>
              </>
            )}
            
            {/* Hidden file input */}
            <label htmlFor="file-upload" className="w-full">
              <Button 
                variant="outline" 
                className="w-full"
                disabled={isProcessing}
              >
                <FileInput className="mr-2 h-4 w-4" />
                {isProcessing ? 'Processing...' : 'Select File'}
              </Button>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".xlsx,.xls,.csv"
                className="sr-only"
                onChange={handleFileInput}
                disabled={isProcessing}
              />
            </label>
          </motion.div>
        </div>
      </CardContent>
      {templateFields.length > 0 && (
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Need help? Download our template
          </p>
          <Button variant="outline" size="sm" onClick={downloadTemplate}>
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Download Template
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ExcelImport;
