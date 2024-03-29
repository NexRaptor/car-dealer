"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import "../style/navbar.css";
const Navbar = () => {
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from local storage

    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("myDataKey");
    }

    // Redirect to the logout page or any other desired page
    router.push("/auth/log-in");
  };

  const isTokenAvailable =
    typeof localStorage !== "undefined" && localStorage.getItem("myDataKey");

  return (
    <Card className="navbar">
      <CardHeader className="flex justify-center p-0">
        <Link href="/">
          <CardTitle className="m-6 naslovHeadera">Polovna vozila</CardTitle>
        </Link>
      </CardHeader>

      <div className="flex justify-end items-center w-[50%]">
        {!isTokenAvailable ? ( // Render Log In and Sign Up buttons
          <>
            <Button
              variant="outline"
              className="m-2  buttonFont"
              onClick={() => {
                router.push("/auth/log-in/");
              }}
            >
              Prijavi se
            </Button>
            <Button
              variant="default"
              className="m-2 buttonFont"
              onClick={() => {
                router.push("/auth/sign-up/");
              }}
            >
              Registracija
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="m-2  buttonFont"
              onClick={() => {
                router.push("/new");
              }}
            >
              Dodaj oglas
            </Button>
            <Button
              variant="default"
              className="m-2  buttonFont"
              onClick={handleLogout}
            >
              Odjavi se
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default Navbar;
