import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import "../../style/carCard.css";
// Specify the type for the 'car' prop
interface CarCardProps {
  car: {
    id: number;
    brand: string;
    price: number;
    year: number;
    car_image: {
      url: string;
    };
  };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { id, brand, price, year, car_image } = car;
  const router = useRouter();

  const handleVidiViseClick = () => {
    router.push(`/${id}`);
  };

  return (
    <Card className="flex flex-col justify-center m-5 karticaAuto">
      <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
        <img
          src={car_image?.url}
          alt={brand}
          style={{
            width: "100%",
            height: "100%", // Set a fixed height for the image container
            objectFit: "cover", // Preserve aspect ratio while covering the container
            display: "block",
          }}
        />
      </div>
      <CardHeader className="podaci">
        <CardTitle>{brand}</CardTitle>
        <CardDescription>Cijena: {price}</CardDescription>
        <CardDescription>Godiste: {year}</CardDescription>
        <Button variant="default" onClick={handleVidiViseClick}>
          Vidi vise
        </Button>
      </CardHeader>
    </Card>
  );
};

export default CarCard;
