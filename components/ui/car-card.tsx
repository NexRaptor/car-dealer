import { Button } from "./button";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

const CarCard = () => {
  return (
    <Card className="w-[90%] mb-6">
      <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
        <img
          src={"/back.jpg"}
          alt="test"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      <CardHeader>
        <CardTitle>Golf VII 4motion</CardTitle>
        <CardDescription>Cijena:20000</CardDescription>
        <CardDescription>Godiste:2014</CardDescription>
        <Button variant="default">Vidi vise</Button>
      </CardHeader>
    </Card>
  );
};

export default CarCard;
