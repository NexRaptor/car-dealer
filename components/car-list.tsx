import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./ui/car-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
interface Car {
  id: number;
  brand: string;
  price: number;
  year: number;
  car_image: {
    url: string;
  };
  // Add types for additional properties here
  // For example:
  fuel: string;
  startingYear: number;
  endingYear: number;
  bodyType: string;
}

const CarList = () => {
  const [carData, setCarData] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://x8ki-letl-twmt.n7.xano.io/api:E9IYILC6/car"
        );
        setCarData(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, []);

  let currentUrl = window.location.href;

  if (currentUrl.includes("?")) {
    let queryParams = new URLSearchParams(window.location.search);
    let brand = queryParams.get("brand");
    let price = queryParams.get("price");
    let fuel = queryParams.get("fuel");
    let startingYear = queryParams.get("startingYear");
    let endingYear = queryParams.get("endingYear");
    let bodyType = queryParams.get("bodyType");
    let filteredCarData = carData.filter((car: Car) => {
      const carYear = car.year;

      return (
        (!brand ||
          brand.toLowerCase() === "sve" ||
          car.brand.toLowerCase() === brand.toLowerCase()) &&
        (!price || car.price <= parseFloat(price)) &&
        (!fuel ||
          fuel.toLowerCase() === "sve" ||
          car.fuel.toLowerCase() === fuel.toLowerCase()) &&
        (!startingYear || carYear >= parseInt(startingYear, 10)) &&
        (!endingYear || carYear <= parseInt(endingYear, 10)) &&
        (!bodyType ||
          bodyType.toLowerCase() === "sve" ||
          car.bodyType.toLowerCase() === bodyType.toLowerCase())
      );
    });
    if (filteredCarData.length === 0) {
      return (
        <Card className="flex flex-col justify-between m-4 h-auto w-[80%]">
          <CardHeader>
            <CardTitle>Oglasi</CardTitle>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="grid grid-cols-4 grid-rows-3">
            <div className="font-bold text-3xl">Nema Rezultata!</div>;
          </CardContent>
        </Card>
      );
    }
    return (
      <Card className="flex flex-col justify-between m-4 h-auto w-[80%]">
        <CardHeader>
          <CardTitle>Oglasi</CardTitle>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent className="grid grid-cols-4 grid-rows-3">
          {filteredCarData.map((car: Car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </CardContent>
      </Card>
    );
  }

  // Render all cars if no query parameters are present
  return (
    <Card className="flex flex-col justify-between m-4 h-auto w-[80%]">
      <CardHeader>
        <CardTitle>Oglasi</CardTitle>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent className="grid grid-cols-4 grid-rows-3">
        {carData.map((car: Car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </CardContent>
    </Card>
  );
};

export default CarList;
