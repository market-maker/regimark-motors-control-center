
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import JobCardForm from "@/components/jobs/JobCardForm";
import JobCard from "@/components/jobs/JobCard";
import JobDetails from "@/components/jobs/JobDetails";
import VehicleAdviceForm from "@/components/jobs/VehicleAdviceForm";
import { Plus, Calendar, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { JobCard as JobCardType } from "@/types/job";
import { motion } from "framer-motion";

// Sample job data
const initialJobs: JobCardType[] = [
  {
    id: "job1",
    customerId: "cust123",
    customerName: "John Smith",
    customerPhone: "0412-345-678",
    vehicleMake: "Toyota",
    vehicleModel: "Corolla",
    vehicleYear: 2019,
    vehicleRegistration: "ABC123",
    jobDescription: "Battery replacement and electrical system check",
    status: "completed",
    createdAt: "2023-04-15T09:30:00Z",
    completedAt: "2023-04-15T14:45:00Z",
    technicianNotes: "Replaced battery, checked alternator and charging system. All working well.",
    parts: [
      { id: "part1", name: "NS60L Battery", quantity: 1, price: 210.50 },
      { id: "part2", name: "Battery Terminal Cleaner", quantity: 1, price: 15.25 }
    ],
    labor: { hours: 1.5, rate: 95 },
    totalCost: 368.25,
    vehicleAdvice: [
      { id: "adv1", item: "Alternator", condition: "Good", notes: "No issues found", priority: "none" },
      { id: "adv2", item: "Battery Terminals", condition: "Good", notes: "Cleaned and protected", priority: "none" },
      { id: "adv3", item: "Starter Motor", condition: "Fair", notes: "Working but showing age", priority: "low" }
    ]
  },
  {
    id: "job2",
    customerId: "cust456",
    customerName: "Sarah Johnson",
    customerPhone: "0423-456-789",
    vehicleMake: "Mazda",
    vehicleModel: "CX-5",
    vehicleYear: 2021,
    vehicleRegistration: "XYZ789",
    jobDescription: "Check engine light diagnosis and repair",
    status: "in-progress",
    createdAt: "2023-04-18T10:15:00Z",
    technicianNotes: "Initial diagnostic shows potential issue with oxygen sensor. Further testing required.",
    parts: [],
    labor: { hours: 0, rate: 95 },
    totalCost: 0,
    vehicleAdvice: []
  },
  {
    id: "job3",
    customerId: "cust789",
    customerName: "Michael Wong",
    customerPhone: "0434-567-890",
    vehicleMake: "Ford",
    vehicleModel: "Ranger",
    vehicleYear: 2020,
    vehicleRegistration: "DEF456",
    jobDescription: "Full electrical system audit and repair",
    status: "scheduled",
    createdAt: "2023-04-20T08:00:00Z",
    scheduledDate: "2023-04-25T09:00:00Z",
    technicianNotes: "Customer reports intermittent electrical issues. Schedule comprehensive diagnostic.",
    parts: [],
    labor: { hours: 0, rate: 95 },
    totalCost: 0,
    vehicleAdvice: []
  }
];

const Jobs = () => {
  const [jobs, setJobs] = useState<JobCardType[]>(initialJobs);
  const [activeTab, setActiveTab] = useState("all");
  const [isNewJobDialogOpen, setIsNewJobDialogOpen] = useState(false);
  const [isAdviceDialogOpen, setIsAdviceDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobCardType | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);

  const handleAddJob = (newJob: JobCardType) => {
    setJobs([newJob, ...jobs]);
    setIsNewJobDialogOpen(false);
  };

  const handleViewDetails = (job: JobCardType) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  const handleUpdateJob = (updatedJob: JobCardType) => {
    setJobs(jobs.map((job) => job.id === updatedJob.id ? updatedJob : job));
    setSelectedJob(null);
    setIsJobDetailsOpen(false);
  };

  const handleAddAdvice = (job: JobCardType, advice: any) => {
    const updatedJob = {
      ...job,
      vehicleAdvice: [...job.vehicleAdvice, advice]
    };
    handleUpdateJob(updatedJob);
    setIsAdviceDialogOpen(false);
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "all") return true;
    if (activeTab === "scheduled") return job.status === "scheduled";
    if (activeTab === "in-progress") return job.status === "in-progress";
    if (activeTab === "completed") return job.status === "completed";
    return true;
  });

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <MainLayout>
      <motion.div 
        className="page-container" 
        initial="hidden"
        animate="show"
        variants={containerAnimation}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <motion.div variants={itemAnimation}>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-regimark-primary to-regimark-accent bg-clip-text text-transparent">
              Job Cards
            </h1>
            <p className="text-muted-foreground">
              Manage vehicle service and repair jobs
            </p>
          </motion.div>
          <motion.div variants={itemAnimation} className="mt-4 md:mt-0">
            <Button 
              onClick={() => setIsNewJobDialogOpen(true)}
              className="btn-3d"
            >
              <Plus className="mr-2 h-4 w-4" /> New Job Card
            </Button>
          </motion.div>
        </div>

        <motion.div variants={itemAnimation}>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="scheduled" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Scheduled
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" /> In Progress
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onClick={() => handleViewDetails(job)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onClick={() => handleViewDetails(job)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onClick={() => handleViewDetails(job)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>No completed jobs</CardTitle>
                      <CardDescription>
                        There are currently no completed jobs to display.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  filteredJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      onClick={() => handleViewDetails(job)}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* New Job Dialog */}
        <Dialog open={isNewJobDialogOpen} onOpenChange={setIsNewJobDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Card</DialogTitle>
            </DialogHeader>
            <JobCardForm 
              onSubmit={handleAddJob} 
              onCancel={() => setIsNewJobDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>

        {/* Job Details Dialog */}
        {selectedJob && (
          <Dialog open={isJobDetailsOpen} onOpenChange={setIsJobDetailsOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Job Details</DialogTitle>
              </DialogHeader>
              <JobDetails 
                job={selectedJob} 
                onClose={() => setIsJobDetailsOpen(false)} 
                onUpdate={handleUpdateJob}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Vehicle Advice Dialog */}
        {selectedJob && (
          <Dialog open={isAdviceDialogOpen} onOpenChange={setIsAdviceDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add Vehicle Inspection Advice</DialogTitle>
              </DialogHeader>
              <VehicleAdviceForm 
                job={selectedJob}
                onSubmit={(advice) => handleAddAdvice(selectedJob, advice)}
                onCancel={() => setIsAdviceDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Jobs;
