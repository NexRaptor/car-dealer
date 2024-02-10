import Navbar from "@/components/navbar";
import Filters from "@/components/filter-card";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dodajte vas oglas",
  description: "Dodajte vas oglas",
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={"h-[100vh] w-[100vw] flex flex-col items-center bg-slate-50"}
    >
      <Navbar />

      {children}
    </div>
  );
}
