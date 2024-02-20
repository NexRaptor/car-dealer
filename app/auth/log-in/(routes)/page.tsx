"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  let mainUrl = "https://x8ki-letl-twmt.n7.xano.io/api:E9IYILC6/";
  const router = useRouter();
  const isTokenAvailable =
    typeof localStorage !== "undefined" && localStorage.getItem("myDataKey");
  if (isTokenAvailable) {
    router.push("/");
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [storedValue, setStoredValue] = useState("");
  const [error, setError] = useState("");
  const handleUpdateStorage = (value: string) => {
    const newValue = value;

    setStoredValue(newValue);

    localStorage.setItem("myDataKey", newValue);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        setError("Sva polja su obavezna");
        return;
      }
    } catch (error) {
      console.error("Greška prilikom slanja forme:", error);
      setError("Došlo je do greške. Pokušajte ponovo.");
    }
    try {
      const response = await axios.post(`${mainUrl}auth/login`, formData);

      if (!response.data.authToken) {
        toast.error("Nije autorizovan");
      } else {
        handleUpdateStorage(response.data.authToken);
        toast.success("Korisnik uspješno prijavljen.");
        router.push("/new");
      }
    } catch (error) {
      toast.error("Došlo je do greške. Pokušajte ponovo.");
    }
  };
  return (
    <div className="flex flex-col items-center h-[100%] w-[100%]  mt-28">
      <Card className="p-4 text-black w-[50%] ">
        <CardHeader className="flex justify-center p-0">
          <CardTitle className=" m-6">Prijavljivanje</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="pl-5">
          <label>
            Email:
            <Input
              placeholder="Unesite email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-400 w-[100%]"
            />
          </label>
          <label>
            Lozinka:
            <Input
              placeholder="Unesite lozinku"
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
            Prijavi se
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
