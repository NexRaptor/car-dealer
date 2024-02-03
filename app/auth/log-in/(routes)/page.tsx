"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="flex flex-col items-center h-[100%] w-[100%] ">
      <Card className="flex justify-between h-[7%] w-[80%] mb-28">
        <CardHeader className="flex justify-center p-0">
          <CardTitle className=" m-6">Login</CardTitle>
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
      <Card className="p-4 text-black w-[50%] ">
        <CardHeader className="flex justify-center p-0">
          <CardTitle className=" m-6">Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="pl-5">
          <label>
            Username:
            <Input
              placeholder="Enter username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-slate-400 w-[100%]"
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
              className="bg-slate-400 w-[100%]"
            />
          </label>
          {error && <div className="text-red-500">{error}</div>}
          <Button
            type="submit"
            variant="default"
            className="p-4  mt-10 mb-10 w-[30%]"
          >
            Log In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
