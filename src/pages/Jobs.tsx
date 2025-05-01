
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { JobCard as JobCardType } from "@/types/job";
import JobCard from "../components/jobs/JobCard";
import JobCardForm from "../components/jobs/JobCardForm";
import JobDetails from "../components/jobs/JobDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";

// Sample job cards for demonstration
const sampleJobCards: JobCardType[] = [
  {
    id: "1",
    createdAt: "2025-04-20T10:30:00Z",
    updatedAt: "2025-04-20T14:45:00Z",
    jobNumber: "JOB-12345",
    status: "In Progress",
    vehicle: {
      id: "v1",
      make: "Toyota",
      model: "Corolla",
      year: "2019",
      licensePlate: "ABC-123",
      color: "Silver",
      mileage: 45000,
      fuelType: "Petrol",
      transmission: "Automatic"
    },
    customerId: "c1",
    customerName: "John Smith",
    technicianId: "t1",
    technicianName: "Mike Technician",
    description: "Regular maintenance, oil change and brake check",
    diagnosis: "Oil was very dirty, brakes at 30% remaining",
    estimatedCost: 180.50,
    estimatedCompletionDate: "2025-04-21T17:00:00Z",
    laborHours: 1.5,
    laborCost: 75.00,
    vehicleAdvice: [
      {
        type: "maintenance",
        description: "Air filter needs replacement in next service",
        priority: "Low",
        estimatedCost: 25.00
      },
      {
        type: "repair",
        description: "Front brake pads should be replaced soon",
        priority: "Medium",
        estimatedCost: 120.00
      }
    ]
  },
  {
    id: "2",
    createdAt: "2025-04-19T09:15:00Z",
    updatedAt: "2025-04-19T16:30:00Z",
    jobNumber: "JOB-12344",
    status: "Completed",
    vehicle: {
      id: "v2",
      make: "Honda",
      model: "Civic",
      year: "2020",
      licensePlate: "XYZ-789",
      color: "Blue",
      mileage: 28000,
      fuelType: "Petrol",
      transmission: "CVT"
    },
    customerId: "c2",
    customerName: "Jane Doe",
    technicianId: "t2",
    technicianName: "Alex Mechanic",
    description: "Check engine light on, strange noise from engine",
    diagnosis: "Found loose timing belt and damaged water pump",
    estimatedCost: 350.75,
    estimatedCompletionDate: "2025-04-19T16:00:00Z",
    completedDate: "2025-04-19T16:30:00Z",
    laborHours: 3.0,
    laborCost: 150.00,
    vehicleAdvice: [
      {
        type: "upgrade",
        description: "Consider upgrading to high-performance spark plugs",
        priority: "Low",
        estimatedCost: 60.00
      }
    ]
  },
  {
    id: "3",
    createdAt: "2025-04-21T11:00:00Z",
    updatedAt: "2025-04-21T11:00:00Z",
    jobNumber: "JOB-12346",
    status: "Pending",
    vehicle: {
      id: "v3",
      make: "Ford",
      model: "F-150",
      year: "2018",
      licensePlate: "TRK-456",
      color: "Red",
      mileage: 65000,
      fuelType: "Petrol",
      transmission: "Automatic"
    },
    customerId: "c3",
    customerName: "Robert Johnson",
    description: "Annual inspection and maintenance",
    estimatedCompletionDate: "2025-04-22T17:00:00Z"
  }
];

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [jobCards, setJobCards] = useState<JobCardType[]>(sampleJobCards);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<JobCardType | null>(null);

  const handleCreateJob = (jobData: Partial<JobCardType>) => {
    const newJob: JobCardType = {
      id: Math.random().toString(36).substring(2, 9),
      ...jobData,
    } as JobCardType;
    
    setJobCards([newJob, ...jobCards]);
    setIsCreatingJob(false);
    toast.success("Job card created successfully");
  };

  const handleUpdateJob = (updatedJob: JobCardType) => {
    setJobCards(jobCards.map(job => job.id === updatedJob.id ? updatedJob : job));
    setSelectedJob(updatedJob);
  };

  const filteredJobs = jobCards.filter(job => {
    const matchesSearch = 
      job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "all" || 
      job.status.toLowerCase() === statusFilter.toLowerCase();
      
    const matchesTab = 
      (activeTab === "active" && job.status !== "Completed" && job.status !== "Canceled") ||
      (activeTab === "completed" && job.status === "Completed") ||
      (activeTab === "all");
      
    return matchesSearch && matchesStatus && matchesTab;
  });

  return (
    <MainLayout>
      <motion.div
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-regimark-primary">Job Cards</h1>
          <Button 
            onClick={() => setIsCreatingJob(true)} 
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" /> New Job Card
          </Button>
        </div>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <TabsList className="mb-4 md:mb-0">
              <TabsTrigger value="active">Active Jobs</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search jobs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="on hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="active" className="m-0">
            {isCreatingJob ? (
              <JobCardForm 
                onSubmit={handleCreateJob} 
                onCancel={() => setIsCreatingJob(false)} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      onViewDetails={(job) => setSelectedJob(job)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No active jobs found. Create a new job card to get started.
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onViewDetails={(job) => setSelectedJob(job)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No completed jobs found matching your criteria.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onViewDetails={(job) => setSelectedJob(job)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No jobs found matching your criteria.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Job details dialog */}
        {selectedJob && (
          <JobDetails 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
            onUpdateJob={handleUpdateJob} 
          />
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Jobs;
