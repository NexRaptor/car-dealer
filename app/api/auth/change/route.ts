import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      userId: string;
      username: string;
      password: string;
      email: string;
    };
  }
) {
  try {
    const body = await req.json();
    const { userId, username, password, email } = body;

    if (!username) {
      return new NextResponse("Username is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    const updatedUser = await prismadb.user.update({
      where: {
        userId: userId,
      },
      data: {
        username,
        password,
        email,
      },
    });

    console.log("User changed successfully");
    console.log(updatedUser);
    return new NextResponse("User changed successfully", { status: 200 });
  } catch (error) {
    console.error("Error changed user:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
