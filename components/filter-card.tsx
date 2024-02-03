"use client";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Separator } from "./ui/separator";
const Filters = () => {
  const formSchema = z.object({
    brand: z.string(),
    price: z.string(),
    fuel: z.enum(["All", "Gas", "Diesel", "Electricity"]),
    startingYear: z.string().refine(
      (value) => {
        if (!value) return true; // Return true if startingYear is not provided
        const numericValue = parseInt(value, 10);
        return numericValue >= 1900 && numericValue <= 2024;
      },
      { message: "Year must be between 1900 and 2024" }
    ),
    endingYear: z.string().refine(
      (value) => {
        if (!value) return true; // Return true if endingYear is not provided
        const numericValue = parseInt(value, 10);
        return numericValue >= 1900 && numericValue <= 2024;
      },
      { message: "Year must be between 1900 and 2024" }
    ),
    bodyType: z.enum([
      "All",
      "Sedan",
      "SUV",
      "Truck",
      "Hatchback",
      "Convertible",
    ]),
  });
  const filterData = [
    {
      id: 1,
      label: "Brand",
      placeholder: "Select a car brand",
      options: ["All", "BMW", "Volkswagen", "Audi"],
    },
    {
      id: 2,
      label: "Price",
      placeholder: "Enter price",
      options: [],
      isInput: true,
    },
    {
      id: 3,
      label: "Fuel",
      placeholder: "Select a car fuel",
      options: ["All", "Gas", "Deisel", "Electricity"],
    },
    {
      id: 4,
      label: "Starting year",
      placeholder: "Enter a starting year",
      options: [],
      isInput: true,
    },
    {
      id: 5,
      label: "Ending year",
      placeholder: "Enter an ending year",
      options: [],
      isInput: true,
    },
    {
      id: 6,
      label: "Body Type",
      placeholder: "Select a car body type",
      options: ["All", "Sedan", "SUV", "Truck", "Hatchback", "Convertible"],
    },
  ];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "All",
      price: "",
      fuel: "All",
      startingYear: "",
      endingYear: "",
      bodyType: "All",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (form.formState.isValid) {
      // Perform additional checks if needed
      toast.success("Success");
      console.log(values);
    } else {
      toast.error("Form is not valid. Please check your inputs.");
    }
  }
  return (
    <Card className="flex flex-col justify-between m-4 h-auto w-[80%]">
      <CardHeader>
        <CardTitle>Search cars</CardTitle>
        <CardDescription>
          Explore a curated selection of pre-owned cars tailored to your
          preferences.
        </CardDescription>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-3 ml-4"
          >
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="w-[280px] mb-6">
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a car brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
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
                  <FormLabel>Fuel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a car fuel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All">Any</SelectItem>
                      <SelectItem value="Gas">Gas</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electricity">Electricity</SelectItem>
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
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter max price"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="startingYear"
              render={({ field }) => (
                <FormItem className="w-[280px]">
                  <FormLabel>Starting Year</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter a starting year"
                    value={field.value}
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
                  <FormLabel>Ending Year</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter an ending year"
                    value={field.value}
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
                  <FormLabel>Body Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a car body type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Convertible">Convertible</SelectItem>
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
            Search
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Filters;
