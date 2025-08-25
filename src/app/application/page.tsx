"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

type ApplicationStatus = "Shortlisted" | "Interview" | "Sent Interest";

interface Application {
  id: string;
  title: string;
  jobId: string;
  status: ApplicationStatus;
  date: string;
}

const applications: Application[] = [
  {
    id: "1",
    title: "Senior Drilling Engineer",
    jobId: "JOB-2025-018",
    status: "Shortlisted",
    date: "Shortlisted on Jan 10, 2024",
  },
  {
    id: "2",
    title: "Reservoir Engineer",
    jobId: "JOB-2025-056",
    status: "Interview",
    date: "Interview on Jan 25, 2024",
  },
  {
    id: "3",
    title: "Production Supervisor",
    jobId: "JOB-2025-075",
    status: "Sent Interest",
    date: "Interest Sent on Jan 30, 2024",
  },
];

const getStatusColor = (status: ApplicationStatus) => {
  switch (status) {
    case "Shortlisted":
      return "bg-green-100 text-green-600";
    case "Interview":
      return "bg-blue-100 text-blue-600";
    case "Sent Interest":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function ApplicationStatusCard() {
    const router =useRouter()
  return (
    <>
    <Navbar/>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center shadow-2xl  text-white p-5">
    <Card className="w-full max-w-xl mx-auto shadow-md" style={{padding:"10px"}}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg">Application Status</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
            style={{padding:"10px",margin:"15px 0px"}}
          >
            <div>
              <h3 className="font-semibold text-gray-800">{app.title}</h3>
              <p className="text-xs text-gray-500">{app.jobId}</p>
              <p className="text-sm text-gray-600 mt-1">{app.date}</p>
            </div>

            <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center">
              <Badge className={`${getStatusColor(app.status)}`}>
                {app.status}
              </Badge>
              <div className="flex gap-3">
                <Button size="icon" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
        <Button
              // type="submit"
              // disabled={isSubmitting}
              className="w-full rounded-xl cursor-pointer"
            //   variant="outline"
              style={{ marginTop: "2px" }}
              onClick={() => router.push("/dashboard")}
            >
              Back
            </Button>
    </Card>
    </div>
    </>
  );
}
