import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import JobCard from "@/components/jobs/JobCard";
import JobDetails from "@/components/jobs/JobDetails";
import { Plus, Calendar, Clock, CheckCircle2, AlertTriangle, Filter } from "lucide-react";
import { JobCard as JobCardType } from "@/types/job";

const Jobs = () => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobCards, setJobCards] = useState<JobCardType[]>([]);

  // Filter jobs based on the selected tab
  const filteredJobs = jobCards.filter(job => {
    const normalizedStatus = job.status.toLowerCase();
    // Filter by status tab
    if (activeTab !== "all" && normalizedStatus !== activeTab) {
      return false;
    }
    // Filter by search term
    if (searchTerm && !job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const selectedJob = selectedJobId ? jobCards.find(job => job.id === selectedJobId) : null;
  
  // Handle job update
  const handleJobUpdate = (updatedJob: JobCardType) => {
    // Update the job in the state
    setJobCards(jobCards.map(job => job.id === updatedJob.id ? updatedJob : job));
    setSelectedJobId(null);
  };

  // Handle creating a new job
  const handleCreateJob = () => {
    // This would open a form to create a new job
    // For now, we'll just add a placeholder job
    const newJob: JobCardType = {
      id: `job-${Date.now()}`,
      customerName: "New Customer",
      customerEmail: "customer@example.com",
      status: "pending",
      priority: "Medium",
      technicianName: "Unassigned",
      createdDate: new Date().toISOString(),
      description: "New job description",
      estimatedCost: 0,
      completedDate: null,
      vehicleMake: "Unknown",
      vehicleModel: "Unknown",
      vehicleYear: "Unknown",
      vehicleRegistration: "Unknown",
      jobDescription: "New job description",
      technicianNotes: "",
      scheduledDate: new Date().toISOString(),
      parts: [],
      labor: { hours: 0, rate: 0 },
      totalCost: 0,
      vehicleAdvice: []
    };
    
    setJobCards([...jobCards, newJob]);
  };

  return (
    <MainLayout>
      <div className="page-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-regimark-primary">Job Management</h1>
          <div className="flex space-x-2">
            <Button className="btn-3d" onClick={handleCreateJob}>
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </div>
        </div>

        <Card className="dashboard-card-glow">
          <CardHeader className="pb-2">
            <CardTitle>Jobs</CardTitle>
            <CardDescription>View and manage all jobs</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and filters row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input 
                placeholder="Search jobs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> Pending
                  </TabsTrigger>
                  <TabsTrigger value="in-progress" className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" /> In Progress
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Completed
                  </TabsTrigger>
                  <TabsTrigger value="scheduled" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Scheduled
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Jobs content area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div 
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className="cursor-pointer"
                  >
                    <JobCard 
                      job={job} 
                      isSelected={job.id === selectedJobId}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground col-span-full">
                  {searchTerm || activeTab !== "all" 
                    ? "No jobs found matching your criteria" 
                    : "No jobs found. Click 'Create New Job' to add your first job."}
                </div>
              )}
            </div>

            {/* Selected job details modal or overlay */}
            {selectedJob && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                  <JobDetails 
                    job={selectedJob} 
                    onClose={() => setSelectedJobId(null)} 
                    onUpdate={handleJobUpdate} 
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Jobs;