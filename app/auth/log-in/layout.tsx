import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login page",
  description: "Login page",
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
      {children}
    </div>
  );
}
