"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

const Navbar = () => {
  const router = useRouter();
  return (
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
  );
};

export default Navbar;
