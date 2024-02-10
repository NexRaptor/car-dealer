"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  brand: string;
  price: number;
  fuel: string;
  year: number;
  bodyType: string;
  car_image: {
    url: string;
  };
  _user: {
    id: number;
    phone: string;
  };
}

interface PregledProps {
  id: number;
}

const PregledAutomobila: React.FC<PregledProps> = ({ id }) => {
  const mainUrl = "https://x8ki-letl-twmt.n7.xano.io/api:E9IYILC6/";
  const router = useRouter();
  const [carDetails, setCarDetails] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get<Car[]>(`${mainUrl}car/${id}`);
        const data = response.data;

        if (data.length > 0) {
          // Assuming you want the first car in the array
          setCarDetails(data[0]);
        } else {
          setCarDetails(null); // Set to null if no cars found
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const renderContent = () => {
    if (!carDetails) {
      return <p>Loading...</p>;
    }

    return (
      <div className="flex flex-row items-center mt-7 w-[80%]">
        <Card className="w-30 h-30 p-2">
          <img
            src={carDetails.car_image?.url || "/default-image.jpg"}
            alt={carDetails.brand || "test"}
            style={{
              width: "40vw",
              height: "auto",
              display: "block",
              borderRadius: "10px",
            }}
          />
        </Card>

        <div className="p-10">
          <Card className="p-4 font-bold">{carDetails.brand || "Unknown"}</Card>
          <Card className="p-4">
            Cena: {carDetails.price !== undefined ? carDetails.price : "N/A"}
          </Card>
          <Card className="p-4">Gorivo: {carDetails.fuel || "N/A"}</Card>
          <Card className="p-4">
            Godina: {carDetails.year !== undefined ? carDetails.year : "N/A"}
          </Card>
          <Card className="p-4">
            Karoserija: {carDetails.bodyType || "N/A"}
          </Card>
          <Card className="p-4 ">
            Broj telefona: {carDetails._user.phone || "Unknown"}
          </Card>
        </div>
        <Button
          variant="destructive"
          onClick={() => {
            router.push("/");
          }}
        >
          Nazad
        </Button>
      </div>
    );
  };

  return renderContent();
};

export default PregledAutomobila;
