"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "../../../style/new.css";
const CreateNew = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const isTokenAvailable =
      typeof localStorage !== "undefined" && localStorage.getItem("myDataKey");

    if (!isTokenAvailable) {
      router.push("/");
    }
  }
  const [id, setId] = useState(0);
  const mainUrl = "https://x8ki-letl-twmt.n7.xano.io/api:E9IYILC6/";
  const formSchema = z.object({
    user_id: z.number(),
    brand: z.string(),
    price: z.string(),
    fuel: z.string(),
    year: z.string(),
    bodyType: z.string(),
    details: z.string(),
    file: z.unknown(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: id,
      brand: "",
      price: "",
      fuel: "",
      year: "",
      bodyType: "",
      details: "",
      file: null,
    },
  });
  // Validate form data
  // Validate form data
  const validateForm = () => {
    let valid = true;

    // Validate brand
    if (!form.getValues("brand").trim()) {
      form.setError("brand", { type: "manual", message: "Brend je obavezan" });
      valid = false;
    } else {
      form.clearErrors("brand");
    }

    // Validate price
    const priceValue = parseFloat(form.getValues("price"));
    if (isNaN(priceValue) || priceValue < 0) {
      form.setError("price", {
        type: "manual",
        message: "Cena ne može biti negativna",
      });
      valid = false;
    } else {
      form.clearErrors("price");
    }

    // Validate fuel
    if (!form.getValues("fuel").trim()) {
      form.setError("fuel", { type: "manual", message: "Gorivo je obavezno" });
      valid = false;
    } else {
      form.clearErrors("fuel");
    }

    // Validate year
    const yearValue = parseInt(form.getValues("year"));
    if (isNaN(yearValue) || yearValue < 1950 || yearValue > 2024) {
      form.setError("year", {
        type: "manual",
        message: "Godina mora biti između 1950 i 2024",
      });
      valid = false;
    } else {
      form.clearErrors("year");
    }

    // Validate bodyType
    if (!form.getValues("bodyType").trim()) {
      form.setError("bodyType", {
        type: "manual",
        message: "Tip karoserije je obavezan",
      });
      valid = false;
    } else {
      form.clearErrors("bodyType");
    }

    // Validate file
    if (!form.getValues("file")) {
      form.setError("file", {
        type: "manual",
        message: "Fotografija je obavezna",
      });
      valid = false;
    } else {
      form.clearErrors("file");
    }

    return valid;
  };

  useEffect(() => {
    const authToken = localStorage.getItem("myDataKey");

    // Check if authToken is truthy before making the request
    if (authToken) {
      axios
        .get("https://x8ki-letl-twmt.n7.xano.io/api:E9IYILC6/auth/me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          // Handle successful response
          console.log("User data:", response.data);
          setId(response.data.id);
        })
        .catch((error) => {
          // Handle error response
          console.error("Error fetching user data:", error);
        });
    }
  }, []); // Empty dependency array to run only once on mount

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (validateForm()) {
      if (!values.details.trim()) {
        values.details = "Nema detaljnih informacija.";
      }
      try {
        const formData = new FormData();
        formData.append("user_id", String(id));
        formData.append("brand", values.brand);
        formData.append("price", values.price);
        formData.append("fuel", values.fuel);
        formData.append("year", values.year);
        formData.append("bodyType", values.bodyType);
        formData.append("details", values.details);
        formData.append("file", values.file as File);
        const authToken = localStorage.getItem("myDataKey");

        const response = await axios.post(`${mainUrl}car`, formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Handle success response
        toast.success("Uspešno");
        console.log(response.data);
      } catch (error) {
        toast.error("Došlo je do greške prilikom slanja forme.");
        console.error(error);
      }
    } else {
      toast.error("Forma nije validna. Molimo proverite vaše unose.");
    }
  };

  return (
    <div className="flex flex-col items-center h-[100%] w-[100%] mt-20">
      <Card className="kartica">
        <CardHeader className="flex justify-center p-0">
          <CardTitle className=" m-6">Dodajte novo vozilo</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="ml-6">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <div>
                  <FormLabel>Brend</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Izaberite brend automobila" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Abarth">Abarth</SelectItem>
                      <SelectItem value="Alfa Romeo">Alfa Romeo</SelectItem>
                      <SelectItem value="Aston Martin">Aston Martin</SelectItem>
                      <SelectItem value="Audi">Audi</SelectItem>
                      <SelectItem value="Bentley">Bentley</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Bugatti">Bugatti</SelectItem>
                      <SelectItem value="Buick">Buick</SelectItem>
                      <SelectItem value="Cadillac">Cadillac</SelectItem>
                      <SelectItem value="Chevrolet">Chevrolet</SelectItem>
                      <SelectItem value="Chrysler">Chrysler</SelectItem>
                      <SelectItem value="Citroën">Citroën</SelectItem>
                      <SelectItem value="Dacia">Dacia</SelectItem>
                      <SelectItem value="Daewoo">Daewoo</SelectItem>
                      <SelectItem value="Daihatsu">Daihatsu</SelectItem>
                      <SelectItem value="Dodge">Dodge</SelectItem>
                      <SelectItem value="Ferrari">Ferrari</SelectItem>
                      <SelectItem value="Fiat">Fiat</SelectItem>
                      <SelectItem value="Ford">Ford</SelectItem>
                      <SelectItem value="Genesis">Genesis</SelectItem>
                      <SelectItem value="GMC">GMC</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Hyundai">Hyundai</SelectItem>
                      <SelectItem value="Infiniti">Infiniti</SelectItem>
                      <SelectItem value="Isuzu">Isuzu</SelectItem>
                      <SelectItem value="Jaguar">Jaguar</SelectItem>
                      <SelectItem value="Jeep">Jeep</SelectItem>
                      <SelectItem value="Kia">Kia</SelectItem>
                      <SelectItem value="Koenigsegg">Koenigsegg</SelectItem>
                      <SelectItem value="Lamborghini">Lamborghini</SelectItem>
                      <SelectItem value="Lancia">Lancia</SelectItem>
                      <SelectItem value="Land Rover">Land Rover</SelectItem>
                      <SelectItem value="Lexus">Lexus</SelectItem>
                      <SelectItem value="Lincoln">Lincoln</SelectItem>
                      <SelectItem value="Lotus">Lotus</SelectItem>
                      <SelectItem value="Maserati">Maserati</SelectItem>
                      <SelectItem value="Maybach">Maybach</SelectItem>
                      <SelectItem value="Mazda">Mazda</SelectItem>
                      <SelectItem value="McLaren">McLaren</SelectItem>
                      <SelectItem value="Mercedes-Benz">
                        Mercedes-Benz
                      </SelectItem>
                      <SelectItem value="Mercury">Mercury</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="Mini">Mini</SelectItem>
                      <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
                      <SelectItem value="Morgan">Morgan</SelectItem>
                      <SelectItem value="Nissan">Nissan</SelectItem>
                      <SelectItem value="Noble">Noble</SelectItem>
                      <SelectItem value="Opel">Opel</SelectItem>
                      <SelectItem value="Pagani">Pagani</SelectItem>
                      <SelectItem value="Peugeot">Peugeot</SelectItem>
                      <SelectItem value="Porsche">Porsche</SelectItem>
                      <SelectItem value="Ram">Ram</SelectItem>
                      <SelectItem value="Renault">Renault</SelectItem>
                      <SelectItem value="Rolls-Royce">Rolls-Royce</SelectItem>
                      <SelectItem value="Saab">Saab</SelectItem>
                      <SelectItem value="Seat">Seat</SelectItem>
                      <SelectItem value="Škoda">Škoda</SelectItem>
                      <SelectItem value="Smart">Smart</SelectItem>
                      <SelectItem value="Subaru">Subaru</SelectItem>
                      <SelectItem value="Suzuki">Suzuki</SelectItem>
                      <SelectItem value="Tesla">Tesla</SelectItem>
                      <SelectItem value="Toyota">Toyota</SelectItem>
                      <SelectItem value="Vauxhall">Vauxhall</SelectItem>
                      <SelectItem value="VW">VW</SelectItem>
                      <SelectItem value="Volvo">Volvo</SelectItem>
                      <SelectItem value="Wuling">Wuling</SelectItem>
                      <SelectItem value="Zagato">Zagato</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <div>
                  <FormLabel>Cena</FormLabel>
                  <Input
                    type="number"
                    placeholder="Unesite cenu"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <div>
                  <FormLabel>Gorivo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Izaberite vrstu goriva" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Benzin">Benzin</SelectItem>
                      <SelectItem value="Dizel">Dizel</SelectItem>
                      <SelectItem value="TNG (Auto-gas)">
                        TNG (Auto-gas)
                      </SelectItem>
                      <SelectItem value="Metan">Metan</SelectItem>
                      <SelectItem value="Hibrid">Hibrid</SelectItem>
                      <SelectItem value="Električni pogon">
                        Električni pogon
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <div>
                  <FormLabel>Godina</FormLabel>
                  <Input
                    type="text"
                    placeholder="Unesite 4-cifrenu godinu"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="bodyType"
              render={({ field }) => (
                <div>
                  <FormLabel>Tip karoserije</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Izaberite tip karoserije" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Limuzina">Limuzina</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Kamion">Kamion</SelectItem>
                      <SelectItem value="Hecbek">Hecbek</SelectItem>
                      <SelectItem value="Kabriolet">Kabriolet</SelectItem>
                      <SelectItem value="Karavan">Karavan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <div>
                  <FormLabel>Detaljan opis</FormLabel>
                  <Input
                    type="text"
                    placeholder="Unesite detaljan opis"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <div className="flex flex-col">
                  <FormLabel className="m-2 ml-0">
                    Izaberite fotografiju
                  </FormLabel>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      form.setValue("file", file, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                  <FormMessage />
                </div>
              )}
            />

            <Button
              type="submit"
              variant="default"
              className="p-4 mt-10 mb-10 w-[30%]"
            >
              Dodajte novo
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateNew;
