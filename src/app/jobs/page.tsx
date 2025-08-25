"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import {ToastContainer,toast} from "react-toast"
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import Pageloader from "@/components/Pageloader";

// ✅ Yup Validation Schema
const schema = yup.object({
  title: yup.string().required("Position title is required"),
  jobId: yup.string().required("Job ID is required"),
  location: yup.string().required("Location is required"),
  salary: yup.string().required("Salary is required"),
});

type JobForm = yup.InferType<typeof schema>;

export default function AddJobForm() {
  const router = useRouter();
  const [loading,setLoading]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobForm>({
    resolver: yupResolver(schema),
  });
const onSubmit = async (data: JobForm) => {
  setLoading(true)
  try {
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("User not authenticated");
      return;
    }

    const { error } = await supabase.from("jobs").insert([
      {
        title: data.title,
        job_id: data.jobId,
        location: data.location,
        salary: data.salary,
        user_id: user.id, // <-- Store user id
      },
    ]);


    

    if (error) {
      console.error("Error inserting job:", error);
      toast.error("Failed to add job");
    } else {
      toast.success("Job added successfully");
      reset(); // Reset the form
      setTimeout(() => {
        
        router.push("/dashboard"); // Redirect to dashboard
      }, 1000);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error("Something went wrong!");
  }finally{
    setLoading(false)
  }
};


  return (
    <>
    <Pageloader loading={loading}/>
    <ToastContainer/>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center shadow-2xl  text-white p-5">
        <Card
          className="w-full max-w-lg bg-white text-black shadow-lg rounded-2xl "
          style={{ padding: "20px" }}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Add Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div style={{ marginBottom: "8px" }}>
                <Label htmlFor="title" style={{ marginBottom: "8px" }}>
                  Position Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter position title"
                  {...register("title")}
                  className="mt-3 mb-3"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: "8px" }}>
                <Label htmlFor="jobId" style={{ marginBottom: "8px" }}>
                  Job ID
                </Label>
                <Input
                  id="jobId"
                  placeholder="Enter job ID"
                  {...register("jobId")}
                />
                {errors.jobId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jobId.message}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: "8px" }}>
                <Label htmlFor="location" style={{ marginBottom: "8px" }}>
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: "8px" }}>
                <Label htmlFor="salary" style={{ marginBottom: "8px" }}>
                  Salary / Month
                </Label>
                <Input
                  id="salary"
                  placeholder="$8k/Month"
                  type="number"
                  {...register("salary")}
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salary.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl cursor-pointer"
                style={{ marginBottom: "8px", marginTop: "8px" }}
              >
                Add Job
              </Button>
            </form>
            <Button
              // type="submit"
              // disabled={isSubmitting}
              className="w-full rounded-xl cursor-pointer"
              variant="outline"
              style={{ marginTop: "2px" }}
              onClick={() => router.push("/dashboard")}
            >
              Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
