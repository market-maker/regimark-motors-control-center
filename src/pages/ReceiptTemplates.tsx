
import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Upload, Check, X } from "lucide-react";
import { useState } from "react";
import { ReceiptTemplate } from "@/types/receipt";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for templates
const mockTemplates: ReceiptTemplate[] = [
  {
    id: "1",
    name: "Standard Receipt",
    description: "Default receipt template with company logo and standard fields",
    filename: "standard_receipt.html",
    previewUrl: "https://via.placeholder.com/300x400?text=Standard+Receipt",
    dateCreated: "2025-01-15",
    dateModified: "2025-02-20",
    isDefault: true,
    type: "receipt"
  },
  {
    id: "2",
    name: "Invoice Receipt",
    description: "Detailed receipt with invoice-like formatting",
    filename: "invoice_receipt.html",
    previewUrl: "https://via.placeholder.com/300x400?text=Invoice+Receipt",
    dateCreated: "2025-02-10",
    dateModified: "2025-02-10",
    isDefault: false,
    type: "receipt"
  },
  {
    id: "3",
    name: "Compact Receipt",
    description: "Minimal receipt format for small paper sizes",
    filename: "compact_receipt.html",
    previewUrl: "https://via.placeholder.com/300x400?text=Compact+Receipt",
    dateCreated: "2025-03-05",
    dateModified: "2025-03-05",
    isDefault: false,
    type: "receipt"
  },
  {
    id: "4",
    name: "Standard Invoice",
    description: "Professional invoice template with detailed breakdown",
    filename: "standard_invoice.html",
    previewUrl: "https://via.placeholder.com/300x400?text=Standard+Invoice",
    dateCreated: "2025-01-10",
    dateModified: "2025-01-10",
    isDefault: true,
    type: "invoice"
  },
  {
    id: "5",
    name: "Detailed Invoice",
    description: "Comprehensive invoice with tax calculations and payment terms",
    filename: "detailed_invoice.html",
    previewUrl: "https://via.placeholder.com/300x400?text=Detailed+Invoice",
    dateCreated: "2025-02-15",
    dateModified: "2025-03-01",
    isDefault: false,
    type: "invoice"
  }
];

const Templates = () => {
  const [templates, setTemplates] = useState<ReceiptTemplate[]>(mockTemplates);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"receipt" | "invoice">("receipt");
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    file: null as File | null,
    type: "receipt" as "receipt" | "invoice"
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewTemplate(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTemplate(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.file) {
      toast.error("Please provide a name and upload a template file");
      return;
    }
    
    // In a real app, we would upload the file to a server here
    // For now, we'll just simulate adding it to our local state
    
    const newTemplateObj: ReceiptTemplate = {
      id: `template-${Date.now()}`,
      name: newTemplate.name,
      description: newTemplate.description,
      filename: newTemplate.file.name,
      previewUrl: `https://via.placeholder.com/300x400?text=${encodeURIComponent(newTemplate.name)}`,
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
      isDefault: false,
      type: newTemplate.type
    };
    
    setTemplates([...templates, newTemplateObj]);
    setIsAddDialogOpen(false);
    setNewTemplate({
      name: "",
      description: "",
      file: null,
      type: "receipt"
    });
    
    toast.success(`${newTemplate.type === "receipt" ? "Receipt" : "Invoice"} template added successfully`);
  };

  const handleSetDefault = (id: string, type: "receipt" | "invoice") => {
    const updatedTemplates = templates.map(template => ({
      ...template,
      isDefault: template.id === id && template.type === type ? true : 
                (template.type === type ? false : template.isDefault)
    }));
    setTemplates(updatedTemplates);
    toast.success(`Default ${type} template updated`);
  };

  const handleDeleteTemplate = (id: string, type: "receipt" | "invoice") => {
    const templateToDelete = templates.find(t => t.id === id);
    if (templateToDelete?.isDefault) {
      toast.error(`Cannot delete the default ${type} template`);
      return;
    }
    
    const updatedTemplates = templates.filter(template => template.id !== id);
    setTemplates(updatedTemplates);
    toast.success("Template deleted successfully");
  };

  const filteredTemplates = templates.filter(template => template.type === activeTab);

  return (
    <MainLayout>
      <div className="page-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-regimark-primary">Templates</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Template
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Manage and customize templates for your sales transactions and invoices. Set default templates or upload your own custom designs.
        </p>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "receipt" | "invoice")} className="mb-6">
          <TabsList>
            <TabsTrigger value="receipt">Receipt Templates</TabsTrigger>
            <TabsTrigger value="invoice">Invoice Templates</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className={template.isDefault ? "border-2 border-regimark-primary" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  {template.name}
                  {template.isDefault && (
                    <Badge className="bg-regimark-primary/10 text-regimark-primary border-regimark-primary border">
                      Default
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden mb-4">
                  <img 
                    src={template.previewUrl} 
                    alt={template.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                <div className="text-xs text-muted-foreground">
                  <p>File: {template.filename}</p>
                  <p>Created: {template.dateCreated}</p>
                  <p>Last modified: {template.dateModified}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {!template.isDefault ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSetDefault(template.id, template.type)}
                  >
                    Set as Default
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    <Check className="mr-2 h-4 w-4" />
                    Default
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-regimark-error hover:text-regimark-error/80"
                  disabled={template.isDefault}
                  onClick={() => handleDeleteTemplate(template.id, template.type)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Template</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-type" className="text-right">
                Type <span className="text-regimark-primary">*</span>
              </Label>
              <div className="col-span-3">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-receipt"
                      name="type"
                      checked={newTemplate.type === "receipt"}
                      onChange={() => setNewTemplate(prev => ({ ...prev, type: "receipt" }))}
                      className="mr-2"
                    />
                    <Label htmlFor="type-receipt">Receipt</Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-invoice"
                      name="type"
                      checked={newTemplate.type === "invoice"}
                      onChange={() => setNewTemplate(prev => ({ ...prev, type: "invoice" }))}
                      className="mr-2"
                    />
                    <Label htmlFor="type-invoice">Invoice</Label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name <span className="text-regimark-primary">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={newTemplate.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={newTemplate.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="template-file" className="text-right pt-2">
                Upload Template <span className="text-regimark-primary">*</span>
              </Label>
              <div className="col-span-3">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center hover:border-muted-foreground/40 transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {newTemplate.file 
                      ? `Selected file: ${newTemplate.file.name}` 
                      : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    HTML, PDF or image files up to 5MB
                  </p>
                  <Input
                    id="template-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".html,.pdf,.jpg,.jpeg,.png"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => document.getElementById('template-file')?.click()}
                >
                  Select File
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAddTemplate}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

// Separate Badge component just for this file
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className || ''}`}>
      {children}
    </span>
  );
};

export default Templates;
