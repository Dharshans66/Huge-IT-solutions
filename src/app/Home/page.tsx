"use client";
import React from "react";
import Image from "next/image";
import Login from "../../../public/assets/login.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabase";
import { ToastContainer,toast } from "react-toastify";
import Pageloader from "@/components/Pageloader";

import Cookies from "js-cookie";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const HomePage = () => {
  const router = useRouter();
    const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("access_token");
   useEffect(() => {
    console.log("token",token);
    
    if (token) {
      router.replace("/dashboard");
      return 
    }
  }, [token]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       let { data, error } = await supabase.from("signin").select("*");
//       console.log("data",data);
      
//       if (error) console.error(error);
//       else setJobs(data || []);
//       setLoading(false);
//     };
//     fetchJobs();
//   }, []);

//   console.log(jobs);

//   useEffect(()=>{
//     const fetch =async()=>{

    
//     const { user } = await supabase.auth.signUp({
//   email: 'dharshan@gmail.com',
//   password: 'TestPassword123',
// })

// await supabase.from('profiles').insert([
//   {
//     id: user.id,
//     full_name: 'Test User',
//     avatar_url: 'https://example.com/avatar.png',
//   },
    
// ])
//     }
//     fetch()
//   },[])

  type LoginPayload={
    email:string,
    password:string
  }
  const Loginuser =async ({email,password}:LoginPayload)=>{
    setLoading(true)
 try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }finally{
    setLoading(false)
  }
  }

  
  return (
    <>
    <Pageloader loading={loading}/>
    <ToastContainer/>
    <div className="h-dvh w-100vw border flex align-items-center justify-content-center ">
      <div className="flex-1">
        <div className="login ">
          <div className="flex min-h-screen items-center justify-center bg-gray-50 ">
            <Card
              className="w-full max-w-md shadow-xl rounded-2xl  border h-90 flex flex-col justify-evenly align-center "
              style={{ padding: "20px" }}
            >
              <CardHeader>
                <CardTitle className=" text-4xl font-bold">Login</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4  h-100">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
   try {
  const data = await Loginuser(values);

  console.log("User logged in:", data.user);

  if (data.session) {
    toast.success("Login successful!");

    Cookies.set("access_token", data.session.access_token, { secure: true });
    Cookies.set("refresh_token", data.session.refresh_token, { secure: true });

    console.log("Access Token:", data.session.access_token);
    console.log("Refresh Token:", data.session.refresh_token);

    resetForm(); 
    router.push("/dashboard"); 
  }
} catch (err: any) {
  console.error(err.message);
  toast.error(err.message);
} finally {
  setSubmitting(false);
}

  }}
                >
                  {({ isSubmitting, handleChange, handleBlur, values }) => (
                    <Form className="flex flex-col justify-around  w-full h-full ">
                      <div>
                        <Field
                          as={Input}
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="h-13 px-13"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Field
                          as={Input}
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="h-13 px-3"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl cursor-pointer"
                        style={{ marginTop: "5px" }}
                      >
                        Login
                      </Button>
                      
                    </Form>
                  )}
                </Formik>
                <Button
                        // type="submit"
                        // disabled={isSubmitting}
                        className="w-full rounded-xl cursor-pointer"
                        variant="outline"
                        style={{ marginTop: "2px" }}
                        onClick={() => router.push("/signup")}
                      >
                        Sign up
                      </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Image src={Login} alt="login imagde" />
      </div>
    </div>
    </>
  );
};

export default HomePage;
