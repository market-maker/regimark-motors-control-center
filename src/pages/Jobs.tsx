
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import JobCard from "@/components/jobs/JobCard";
import JobDetails from "@/components/jobs/JobDetails";
import { VehicleAdviceForm } from "@/components/jobs/VehicleAdviceForm";
import { Plus, Calendar, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { JobCard as JobCardType } from "@/types/job";

const Jobs = () => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdviceForm, setShowAdviceForm] = useState(false);

  // Sample job cards for demonstration
  const jobCards: JobCardType[] = [
    {
      id: "1",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      status: "pending",
      priority: "High",
      technicianName: "Mike Smith",
      createdDate: new Date().toISOString(),
      description: "Engine overhaul for Toyota Corolla",
      estimatedCost: 2500,
      completedDate: null,
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      vehicleYear: "2018",
      vehicleRegistration: "ABC123",
      jobDescription: "Complete engine overhaul required due to oil leakage",
      technicianNotes: "Requires new gaskets and timing belt",
      scheduledDate: new Date(Date.now() + 86400000).toISOString(),
      parts: [
        { name: "Engine Gasket Set", quantity: 1, cost: 189.99 },
        { name: "Timing Belt", quantity: 1, cost: 79.99 },
        { name: "Oil Filter", quantity: 1, cost: 15.99 }
      ],
      labor: { hours: 8, rate: 95 },
      totalCost: 1045.97,
      vehicleAdvice: [
        { 
          type: "maintenance", 
          description: "Replace brake pads", 
          priority: "Medium",
          id: "advice1",
          item: "Brakes",
          condition: "Fair",
          notes: "Front pads worn to 30%",
          estimatedCost: 150
        },
        { 
          type: "repair", 
          description: "Fix air conditioning", 
          priority: "Low",
          id: "advice2",
          item: "AC System",
          condition: "Poor",
          notes: "Not cooling properly",
          estimatedCost: 350
        }
      ]
    },
    {
      id: "2",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      status: "completed",
      priority: "Medium",
      technicianName: "Robert Johnson",
      createdDate: new Date().toISOString(),
      completedDate: new Date().toISOString(),
      description: "Brake replacement and wheel alignment",
      estimatedCost: 450,
      vehicleMake: "Honda",
      vehicleModel: "Civic",
      vehicleYear: "2020",
      vehicleRegistration: "XYZ789",
      jobDescription: "Front and rear brake replacement with wheel alignment",
      technicianNotes: "Completed with premium brake pads",
      scheduledDate: new Date(Date.now() - 86400000).toISOString(),
      parts: [
        { name: "Front Brake Pads", quantity: 1, cost: 89.99 },
        { name: "Rear Brake Pads", quantity: 1, cost: 79.99 }
      ],
      labor: { hours: 3, rate: 95 },
      totalCost: 454.98,
      vehicleAdvice: [
        { 
          type: "maintenance", 
          description: "Change engine oil", 
          priority: "Low",
          id: "advice3",
          item: "Engine",
          condition: "Good",
          notes: "Due in 1000 km",
          estimatedCost: 50
        }
      ]
    },
    {
      id: "3",
      customerName: "Robert Brown",
      customerEmail: "robert@example.com",
      status: "in-progress",
      priority: "Critical",
      technicianName: "Sarah Wilson",
      createdDate: new Date().toISOString(),
      description: "Electrical system troubleshooting",
      estimatedCost: 350,
      completedDate: null,
      vehicleMake: "Ford",
      vehicleModel: "Focus",
      vehicleYear: "2019",
      vehicleRegistration: "DEF456",
      jobDescription: "Diagnose and fix intermittent electrical issues",
      technicianNotes: "Suspecting alternator or battery problems",
      scheduledDate: new Date().toISOString(),
      parts: [],
      labor: { hours: 2, rate: 95 },
      totalCost: 190,
      vehicleAdvice: []
    }
  ];

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
    // In a real app this would update the job in the database
    console.log("Job updated:", updatedJob);
    // For now we'll just close the details view
    setSelectedJobId(null);
  };

  return (
    <MainLayout>
      <div className="page-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-regimark-primary">Job Management</h1>
          <div className="flex space-x-2">
            <Button 
              className="btn-3d"
              onClick={() => setShowAdviceForm(!showAdviceForm)}
              variant={showAdviceForm ? "default" : "outline"}
            >
              {showAdviceForm ? "Hide Advice Form" : "Show Advice Form"}
            </Button>
            <Button className="btn-3d">
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column - Job cards list (wider) */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="dashboard-card-glow">
              <CardHeader className="pb-2">
                <CardTitle>Jobs</CardTitle>
                <CardDescription>View and manage all jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <Input 
                    placeholder="Search jobs..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-5 mb-2">
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
                
                <div className="mt-4 space-y-6 max-h-[700px] overflow-y-auto px-1">
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
                    <div className="text-center py-10 text-muted-foreground">
                      No jobs found matching your criteria
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Job details or vehicle advice */}
          <div className="lg:col-span-2">
            {selectedJob ? (
              <JobDetails 
                job={selectedJob} 
                onClose={() => setSelectedJobId(null)} 
                onUpdate={handleJobUpdate} 
              />
            ) : showAdviceForm ? (
              <Card className="dashboard-card-glow h-full">
                <CardHeader>
                  <CardTitle>Vehicle Advice Form</CardTitle>
                  <CardDescription>Create recommendations for vehicle maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <VehicleAdviceForm />
                </CardContent>
              </Card>
            ) : (
              <Card className="dashboard-card-glow h-full flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-medium">No Job Selected</h3>
                  <p className="text-muted-foreground">
                    Select a job from the list to view details or use the button above to show the vehicle advice form.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Jobs;
