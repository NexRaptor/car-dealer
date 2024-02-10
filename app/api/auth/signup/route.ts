import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { username: string; password: string; email: string } }
) {
  try {
    const body = await req.json();
    const { username, password, email } = body;

    if (!username) {
      return new NextResponse("Username is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const user = await prismadb.user.create({
      data: {
        username,
        password,
        email,
      },
    });

    console.log("User created successfully:", user);

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
