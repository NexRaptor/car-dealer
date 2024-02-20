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
      file: null,
    },
  });
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
    if (form.formState.isValid) {
      try {
        const formData = new FormData();
        formData.append("user_id", String(id));
        formData.append("brand", values.brand);
        formData.append("price", values.price);
        formData.append("fuel", values.fuel);
        formData.append("year", values.year);
        formData.append("bodyType", values.bodyType);
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
        // Handle error response
        toast.error("Došlo je do greške prilikom slanja forme.");
        console.error(error);
      }
    } else {
      toast.error("Forma nije validna. Molimo proverite vaše unose.");
    }
  };

  return (
    <div className="flex flex-col items-center h-[100%] w-[100%] mt-28">
      <Card className="pr-4 text-black w-[50%] ">
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
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Audi">Audi</SelectItem>
                      <SelectItem value="VW">Volkswagen</SelectItem>
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
                      <SelectItem value="Električni">Električni</SelectItem>
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
