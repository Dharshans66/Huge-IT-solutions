import React from 'react'
import Image from 'next/image'
import profile from "../../public/assets/profile.png"
import {  Bell } from "lucide-react";
import { MdOutlineLogout } from "react-icons/md";
import { useEffect,useState } from 'react';
import { supabase } from '@/lib/supabase';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ToastContainer,toast } from 'react-toastify';

  interface UserDetails {
  id: string;
  email: string;
  username: string;
}
const Navbar = () => {


  const [user, setUser] = useState<UserDetails | null>(null);


const router =useRouter()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("access_token");
        if (!token) {
          console.log("No token found, redirecting to login");
          router.push("/");
          return;
        }

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
        router.push("/"); // redirect to login if token invalid
      }
    };

    fetchUser();
  }, [router]);

    const handleLogout = () => {
    // Remove cookies
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    // Redirect to home page
    toast.success("logged out successfully")
    setTimeout(() => {
      
      router.push("/");
    },1000);
  };
  return (
    <>
    <ToastContainer/>
     <nav className="w-full bg-white shadow-sm border-b px-6 py-5 flex items-center justify-between" style={{padding:"20px 0px"}}>
      <div className="text-xl font-bold tracking-wide " style={{marginLeft:"80px"}}>HUGE</div>

      <div className="flex items-center gap-6" >
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer" style={{marginRight:"30px"}}>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={profile}
              alt="User profile"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div className="text-sm text-right">
            <div className="font-semibold text-xl">{user?.username}</div>
            <div className="text-gray-500 text-xs">Candidate</div>
          </div>
            <div style={{marginLeft:"30px",display:"flex"}} onClick={handleLogout}>
         
            <MdOutlineLogout size={25} />
            <p>Logout</p>
            </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar