"use client";
import { Bell } from "lucide-react"; // you can also use Heroicons
import Image from "next/image";
import profile from "../../../public/assets/profile.png"
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEye, FaCommentDots } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { supabase } from "@/lib/supabase";
import Pageloader from "@/components/Pageloader";
// import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
// import { Database } from "@/lib/database.types"; 


interface UserDetails {
  id: string;
  email: string;
  username: string;
}
type Job = {
  id: number;
  title: string;
  job_id: string;
  location: string;
  salary: string;
  user_id: string;
};

const DashboardPage = () => {
    const router =useRouter()
   const session =useSession()
  const [user, setUser] = useState<UserDetails | null>(null);
    const [job, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
    
useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const token = Cookies.get("access_token");
      

        // Get user info using the token
        const { data: userData, error } = await supabase.auth.getUser(token);

        if (error) throw error;
        if (!userData?.user) return;

        const userDetails: UserDetails = {
          id: userData.user.id,
          email: userData.user.email ?? "",
          username: userData.user.user_metadata?.username ?? "",
        };

        setUser(userDetails);
      } catch (err) {
        console.error("Error fetching user:", err);
        // router.push("/"); // redirect to login if token invalid
      }finally{
        setLoading(false)
      }
    };

    fetchUser();
  }, [router]);


  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("User not authenticated", userError);
          setLoading(false);
          return;
        }

        // Fetch jobs for this user
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching jobs:", error);
        } else {
          setJobs(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  console.log("jobs",job);
  

  // console.log("this is user",user);
  


  return (
    
    <div>
       <Navbar/>
       <Pageloader loading={loading}/>
      <div className="max-w-12xl mx-auto bg-white rounded-2xl shadow-lg border  " style={{padding:"15px",marginTop:"20px"}}>
      <div className="flex justify-between items-center mb-6">
        <div className="w-full mr-4">
          {/* <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-2 bg-green-500 w-3/4" /> 
          </div> */}
          {/* <span className="text-sm text-green-600 font-medium mt-2 inline-block">
            75% Completed
          </span> */}
        </div>
        <button className="text-xs text-indigo-600 bg-indigo-50 px-4 py-1 rounded-lg hover:bg-indigo-100">
          View
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col items-center md:items-start">
          <div className="w-28 h-28 rounded-full overflow-hidden border shadow-sm">
            <Image
              src={profile} 
              alt="Profile"
              width={112}
              height={112}
              className="object-cover"
            />
          </div>

          <h2 className="mt-4 text-2xl font-semibold">{user?.username}</h2>

          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            Houston, South, US
          </div>

          <button className="mt-4 flex items-center gap-2 border rounded-lg px-4 py-1 text-sm shadow-sm hover:bg-gray-50">
            <FileText className="w-4 h-4" />
            Resume
          </button>

          <div className="mt-6 space-y-3 text-sm w-full">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>(832) 555-1209</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-700 text-sm leading-relaxed">
            Experienced Logistics & Supply Chain professional contributing to
            the National Fuel Distribution Project — a strategic initiative
            focused on enhancing the efficiency, reliability, and sustainability
            of fuel distribution across the country. Skilled in optimizing
            logistics operations, improving inventory visibility, and
            coordinating deliveries across regional hubs. Proven ability to
            streamline supply routes, reduce operational delays, and support
            data-driven distribution strategies in high-impact national projects.
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Fuel Logistics",
                "Supply Chain",
                "Fleet Management",
                "Fuel Monitoring",
                "Route Optimization",
                "Inventory Control",
                "Logistics Coordination",
                "ERP Systems",
                "Compliance Management",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
           <Button
                        // type="submit"
                        // disabled={isSubmitting}
                        className="w-50 rounded-xl cursor-pointer "
                        // variant="outline"
                        style={{ marginTop: "10px" }}
                        onClick={() => router.push("/application")}
                      >
                        Application status
                      </Button>
        </div>
      </div>
    </div>
    <div className="w-full max-w-12xl mx-auto bg-white rounded-2xl shadow-md border p-6" style={{padding:"15px",marginTop:"20px"}}>
      <h2 className="text-xl font-semibold">Recommended Jobs</h2>
      <p className="text-sm text-gray-500 mb-6">
        Perfect matches for your profile
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{padding:"30px"}}>
        {job.map((job, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col"
            style={{padding:"10px"}}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{job?.title}</h3>
                <p className="text-xs text-gray-500">{job?.job_id}</p>
              </div>
              <span className="text-xs text-gray-400">Today</span>
            </div>

            {/* Details */}
            <div className="mt-3 text-sm text-gray-600 flex-1">
              <p className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-400" />
                {job.location}
              </p>
              <p className="mt-1 font-medium">${job.salary}k/Month</p>
              <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                Rotation
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 mt-4">
              <Button className="flex-1 rounded-xl">I’m Interested</Button>
              <Button variant="outline" size="icon" className="rounded-lg">
                <FaEye />
              </Button>
              <Button variant="outline" size="icon" className="rounded-lg">
                <FaCommentDots />
              </Button>
            </div>
          </div>
        ))}
      </div>
       <div className="flex items-center gap-2 mt-4">
        <Button className="flex-1 rounded-xl cursor-pointer" onClick={()=> router.push('/jobs')}>Add new jobs</Button>
        </div>
    </div>
    </div>
  )
}

export default DashboardPage