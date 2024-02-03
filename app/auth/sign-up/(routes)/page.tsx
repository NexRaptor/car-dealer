"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
const SignIn = () => {
  const router = useRouter();

  // Validation error messages state
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    passwordRepeat: "",
  });

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form data
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else {
      newErrors.username = "";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }
    if (formData.password.trim().length < 8) {
      newErrors.password = "Password need to have 8 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    // Validate password repeat
    if (formData.password !== formData.passwordRepeat) {
      newErrors.passwordRepeat = "Passwords do not match";
      valid = false;
    } else {
      newErrors.passwordRepeat = "";
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      // Your form submission logic here (e.g., using axios)
      try {
        const response = await axios.post("/api/auth/signup", formData);
        console.log("User created successfully:", response.data);
        toast.success("User created successfully.");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-[100%] w-[100%] ">
      <Card className="flex justify-between h-[7%] w-[80%] mb-28">
        <CardHeader className="flex justify-center p-0">
          <CardTitle className=" m-6">Sign Up</CardTitle>
        </CardHeader>

        <div className="flex justify-end items-center w-[50%]">
          <Button
            variant="outline"
            className="m-2 w-[30%] "
            onClick={() => {
              router.push("/");
            }}
          >
            Go Back
          </Button>
        </div>
      </Card>
      <Card className="pr-4 text-black w-[50%] ">
        <CardHeader className="flex justify-center p-0">
          <CardTitle className=" m-6">Sign Up</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="ml-6">
          <label>
            Username:
            <Input
              placeholder="Enter username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-slate-400 "
            />
            {errors.username && (
              <div className="text-red-500">{errors.username}</div>
            )}
          </label>
          <label>
            E-mail:
            <Input
              placeholder="Enter email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-400"
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </label>
          <label>
            Password:
            <Input
              placeholder="Enter password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-slate-400"
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </label>
          <label>
            Repeat Password:
            <Input
              placeholder="Repeat password"
              type="password"
              name="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleChange}
              className="bg-slate-400"
            />
            {errors.passwordRepeat && (
              <div className="text-red-500">{errors.passwordRepeat}</div>
            )}
          </label>

          <Button
            type="submit"
            variant="secondary"
            className="p-4 mt-10 mb-10 w-[100%] bg-green-500 text-white"
          >
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
