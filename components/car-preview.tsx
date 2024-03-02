"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import "../style/carPreview.css";
interface Car {
  id: number;
  brand: string;
  price: number;
  fuel: string;
  year: number;
  bodyType: string;
  details: string;
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
      <div className="kartica">
        <Card className="slikaKartica">
          <img
            className="slika"
            src={carDetails.car_image?.url || "/default-image.jpg"}
            alt={carDetails.brand || "Unknown"}
          />
        </Card>

        <div className="detalji">
          <Card className="detaljiBrand">{carDetails.brand || "Unknown"}</Card>
          <Card className="detaljiOstalo">
            Cena: {carDetails.price !== undefined ? carDetails.price : "N/A"}
          </Card>
          <Card className="detaljiOstalo">
            Gorivo: {carDetails.fuel || "N/A"}
          </Card>
          <Card className="detaljiOstalo">
            Godina: {carDetails.year !== undefined ? carDetails.year : "N/A"}
          </Card>
          <Card className="detaljiOstalo">
            Karoserija: {carDetails.bodyType || "N/A"}
          </Card>
          <Card className="detaljiOstalo ">
            Broj telefona: {carDetails._user.phone || "Unknown"}
          </Card>
          <Card className="detaljiOstalo ">
            Detaljan opis: <br />
            {carDetails.details || "Unknown"}
          </Card>
        </div>
        <Button
          variant="destructive"
          className="m-6"
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
