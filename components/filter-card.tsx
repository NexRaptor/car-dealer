import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
import { toast } from "react-hot-toast";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";

const Filters = () => {
  const router = useRouter();

  const formSchema = z.object({
    brand: z.string(),
    price: z.string(),
    fuel: z.string(),
    startingYear: z.string().refine(
      (value) => {
        if (!value) return true;
        const numericValue = parseInt(value, 10);
        return numericValue >= 1900 && numericValue <= 2024;
      },
      { message: "Godina mora biti između 1900. i 2024." }
    ),
    endingYear: z.string().refine(
      (value) => {
        if (!value) return true;
        const numericValue = parseInt(value, 10);
        return numericValue >= 1900 && numericValue <= 2024;
      },
      { message: "Godina mora biti između 1900. i 2024." }
    ),
    bodyType: z.string(),
  });

  const defaultValues = {
    brand: "",
    price: "",
    fuel: "",
    startingYear: "",
    endingYear: "",
    bodyType: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (formData: Record<string, any>) => {
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== undefined && value !== null
      )
    );

    const queryParams = new URLSearchParams(filteredFormData).toString();

    window.location.href = `/?${queryParams}`;
  };

  return (
    <Card className="flex flex-col justify-between m-4 h-auto w-[80%]">
      <CardHeader>
        <CardTitle>Pretraga automobila</CardTitle>
        <CardDescription>
          Istražite odabrani izbor polovnih automobila prilagođen vašim
          preferencijama.
        </CardDescription>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent>
        <Form {...form}>
          <form
            method="get"
            action="/"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-3 ml-4"
          >
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="w-[280px] mb-6">
                  <FormLabel>Brend</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Izaberite brend automobila" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sve">Sve</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="AUDI">Audi</SelectItem>
                      <SelectItem value="VW">Volkswagen</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <FormItem className="w-[280px]">
                  <FormLabel>Gorivo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Izaberite vrstu goriva" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sve">Sve</SelectItem>
                      <SelectItem value="Benzin">Benzin</SelectItem>
                      <SelectItem value="Dizel">Dizel</SelectItem>
                      <SelectItem value="Električnost">Električnost</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-[280px]">
                  <FormLabel>Cena</FormLabel>
                  <Input
                    type="text"
                    placeholder="Unesite maksimalnu cenu"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startingYear"
              render={({ field }) => (
                <FormItem className="w-[280px]">
                  <FormLabel>Početna godina</FormLabel>
                  <Input
                    type="text"
                    placeholder="Unesite početnu godinu proizvodnje"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endingYear"
              render={({ field }) => (
                <FormItem className="w-[280px]">
                  <FormLabel>Završna godina</FormLabel>
                  <Input
                    type="text"
                    placeholder="Unesite završnu godinu proizvodnje"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bodyType"
              render={({ field }) => (
                <FormItem className="w-[280px]">
                  <FormLabel>Tip karoserije</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Izaberite tip karoserije" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={1} value="Sve">
                        Sve
                      </SelectItem>
                      <SelectItem key={2} value="Limuzina">
                        Limuzina
                      </SelectItem>
                      <SelectItem key={3} value="SUV">
                        SUV
                      </SelectItem>
                      <SelectItem key={4} value="Kamion">
                        Kamion
                      </SelectItem>
                      <SelectItem key={5} value="Hecbek">
                        Hečbek
                      </SelectItem>
                      <SelectItem key={6} value="Kabriolet">
                        Kabriolet
                      </SelectItem>
                      <SelectItem key={7} value="Karavan">
                        Karavan
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <CardFooter className="flex justify-end mt-6 ">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="w-[30%]"
          >
            <Search />
            Pretraga
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Filters;
