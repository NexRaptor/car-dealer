import Navbar from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp stranica",
  description: "SignUp stranica",
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
