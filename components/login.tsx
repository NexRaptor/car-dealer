"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Modal } from "./ui/modal";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SignIn from "./sign-in";
import { Card, CardHeader, CardTitle } from "./ui/card";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData.username || !formData.password) {
        setError("All fields are required");
        return;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again.");
    }
    try {
      const response = await axios.post("/api/auth/login", formData);
      console.log("User login successfull.", response.data);
      toast.success("User login successfull.");
      router.push(`/home/${formData.username}`);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className="flex justify-center items-center mb-60 mt-20 h-[100%] w-[100%] ">
      <Card className="flex justify-between h-[7%] w-[80%]">
        <CardHeader className="flex justify-center p-0">
          <CardTitle className=" m-6 ">Used cars</CardTitle>
        </CardHeader>

        <div className="flex justify-end items-center w-[50%]">
          <Button
            variant="outline"
            className="m-2 w-[20%]"
            onClick={() => {
              router.push("/auth/log-in/");
            }}
          >
            Log In
          </Button>
          <Button
            variant="default"
            className="m-2 w-[30%] "
            onClick={() => {
              router.push("/auth/sign-up/");
            }}
          >
            Sign Up
          </Button>
        </div>
      </Card>
      <div className="p-4 text-white w-[70%] ">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <Input
              placeholder="Enter username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-slate-400"
            />
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
          </label>
          {error && <div className="text-red-500">{error}</div>}
          <Button
            type="submit"
            variant="secondary"
            className="p-4 mt-4 w-[100%] bg-green-500  text-white"
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
