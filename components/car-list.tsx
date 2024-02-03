import CarCard from "./ui/car-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
const CarList = () => {
  return (
    <Card className="flex flex-col justify-between m-4 h-auto w-[80%]">
      <CardHeader>
        <CardTitle>Cars</CardTitle>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent className="grid grid-cols-4 grid-rows-3">
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </CardContent>
    </Card>
  );
};

export default CarList;
