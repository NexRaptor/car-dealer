import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return new NextResponse("Username and password are required", {
        status: 400,
      });
    }

    const user = await prismadb.user.findFirst({
      where: {
        username,
      },
    });
    if (!user || user.password !== password) {
      return new NextResponse("Invalid username or password", { status: 401 });
    }

    return NextResponse.json({ message: "SUCCES" });
  } catch (error) {
    return NextResponse.json({ message: "ERROR" });
  }
}
