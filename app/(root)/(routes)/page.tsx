import CarList from "@/components/car-list";
import Filters from "@/components/filter-card";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-[100vw]">
      <Filters />
      <CarList />
    </div>
  );
}
