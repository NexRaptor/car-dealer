import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./ui/car-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import "../style/carList.css";
interface Car {
  id: number;
  brand: string;
  price: number;
  year: number;
  car_image: {
    url: string;
  };
  fuel: string;
  startingYear: number;
  endingYear: number;
  bodyType: string;
}

const CarList = () => {
  const [carData, setCarData] = useState<Car[]>([]);
  const [filteredCarData, setFilteredCarData] = useState<Car[] | null>(null);

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

  useEffect(() => {
    let currentUrl = window.location.href;

    if (currentUrl.includes("?")) {
      let queryParams = new URLSearchParams(window.location.search);
      let brand = queryParams.get("brand");
      let price = queryParams.get("price");
      let fuel = queryParams.get("fuel");
      let startingYear = queryParams.get("startingYear");
      let endingYear = queryParams.get("endingYear");
      let bodyType = queryParams.get("bodyType");

      let filteredCars = carData.filter((car: Car) => {
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

      setFilteredCarData(filteredCars);
    } else {
      setFilteredCarData(null);
    }
  }, [carData]);

  return (
    <Card className="flex flex-col justify-between m-4 h-auto w-[80%]">
      <CardHeader>
        <CardTitle className="myclass">Oglasi</CardTitle>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent className="grid grid-cols-4 grid-rows-3">
        {filteredCarData ? (
          filteredCarData.length === 0 ? (
            <div className="font-bold text-3xl">Nema Rezultata!</div>
          ) : (
            filteredCarData.map((car: Car) => (
              <CarCard key={car.id} car={car} />
            ))
          )
        ) : (
          carData.map((car: Car) => <CarCard key={car.id} car={car} />)
        )}
      </CardContent>
    </Card>
  );
};

export default CarList;
