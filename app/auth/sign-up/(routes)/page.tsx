"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import "../../../../style/signup.css";
const SignIn = () => {
  const router = useRouter();
  const isTokenAvailable =
    typeof localStorage !== "undefined" && localStorage.getItem("myDataKey");
  if (isTokenAvailable) {
    router.push("/");
  }
  let mainUrl = "https://x8ki-letl-twmt.n7.xano.io/api:E9IYILC6/";
  const [storedValue, setStoredValue] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    phone: "",
  });

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
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

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Ime je obavezno";
      valid = false;
    } else {
      newErrors.name = "";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon je obavezan";
      valid = false;
    } else if (formData.phone.trim().length < 9) {
      newErrors.phone = "Minimalna dužina broja telefona je 9";
      valid = false;
    } else {
      newErrors.phone = "";
    }
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email je obavezan";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Neispravan format email adrese";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Lozinka je obavezna";
      valid = false;
    } else if (formData.password.trim().length < 8) {
      newErrors.password = "Lozinka mora imati najmanje 8 karaktera";
      valid = false;
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Lozinka mora sadržavati barem jedno slovo";
      valid = false;
    } else {
      newErrors.password = "";
    }

    // Validate password repeat
    if (formData.password !== formData.passwordRepeat) {
      newErrors.passwordRepeat = "Lozinke se ne podudaraju";
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
        const response = await axios.post(`${mainUrl}auth/signup`, formData);
        if (!response.data.authToken) {
          toast.error("Nije autorizovan");
        } else {
          handleUpdateStorage(response.data.authToken);
          console.log("Korisnik uspješno kreiran:", response.data);
          toast.success("Korisnik uspješno kreiran.");
          router.push("/new");
        }
      } catch (error) {
        toast.error("Došlo je do greške.");
      }
    }
  };

  const handleUpdateStorage = (value: string) => {
    const newValue = value;

    setStoredValue(newValue);

    localStorage.setItem("myDataKey", newValue);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("myDataKey");
    if (storedData) {
      setStoredValue(storedData);
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-[100%] w-[100%] mt-20">
      <Card className="kartica">
        <CardHeader className="flex justify-center p-0">
          <CardTitle className=" m-6">Registracija</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="ml-6">
          <label>
            Ime:
            <Input
              placeholder="Unesite ime"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-400 "
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </label>
          <label>
            E-mail:
            <Input
              placeholder="Unesite email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-400"
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </label>
          <label>
            Telefon:
            <Input
              placeholder="Unesite telefon"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-slate-400"
            />
            {errors.phone && <div className="text-red-500">{errors.phone}</div>}
          </label>
          <label>
            Lozinka:
            <Input
              placeholder="Unesite lozinku"
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
            Ponovi lozinku:
            <Input
              placeholder="Ponovite lozinku"
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
            variant="default"
            className="p-4 mt-10 mb-10 w-[50%]"
          >
            Registracija
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
