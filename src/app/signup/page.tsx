"use client"
import React, { useState } from 'react'
import Image from "next/image";
import Login from "../../../public/assets/login.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import signup from "../../../public/assets/signin.jpg"
import { useRouter } from 'next/navigation';
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { supabase } from '@/lib/supabase';
import { ToastContainer,toast } from "react-toastify";
import Pageloader from '@/components/Pageloader';

const SignupSchema = Yup.object({
  username:Yup.string().required("user name is required"),  
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const page = () => {
    const router =useRouter()
    const [loading,setLoading]=useState(false)

    type SignUpPayload = {
  username: string;
  email: string;
  password: string;
};

    const signUpUser = async ({ username, email, password }:SignUpPayload) => {
      setLoading(true)
   try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // 👈 stored in user_metadata
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }finally{
    setLoading(false)
  }
};

  return (
    <>
    <Pageloader loading={loading}/>
    <ToastContainer/>
        <div className="h-dvh w-100vw border flex align-items-center justify-content-center ">
      <div className="flex-1">
                <Image src={signup} alt="signup image " />
      </div>
      <div className="flex-1">
        <div className="login ">
          <div className="flex min-h-screen items-center justify-center bg-gray-50 ">
            <Card className="w-full max-w-md shadow-xl rounded-2xl  border h-100 flex flex-col justify-evenly align-center " style={{padding:"20px"}}>
              <CardHeader>
                <CardTitle className=" text-4xl font-bold">
                  Signup
                </CardTitle>
              </CardHeader>
              <CardContent  className="flex flex-col gap-4  h-100">
                <Formik
                  initialValues={{ username:"",email: "", password: "" }}
                  validationSchema={SignupSchema}
                 onSubmit={async (values, { setSubmitting ,resetForm}) => {
    try {
      const data = await signUpUser(values);
      console.log("User signed up:", data.user);
      if(data.user){
        toast.success("Signup successful!");
         resetForm();
         setTimeout(()=>{

           router.push('/')
         },1000)
      }

    } catch (err) {
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
                          type="text"
                          name="username"
                          placeholder="Enter your name"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="h-13 px-13"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
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
                        style={{marginTop:"5px"}}


                      >
                        sign up
                      </Button>
                      
                    </Form>
                  )}
                </Formik>
                <Button
                        // type="submit"
                        // disabled={isSubmitting}
                        className="w-full rounded-xl cursor-pointer"
                          variant="outline"
style={{marginTop:"5px"}}
onClick={()=> router.push('/')}
                      >
                        Already have an account?
                      </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default page