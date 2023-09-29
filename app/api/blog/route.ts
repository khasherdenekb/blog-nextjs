import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("Database connection error: " + error);
  }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await main();
    const Posts = await prisma.posts.findMany();
    return NextResponse.json({ message: "Success", Posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { title, content, contentImage, authorName, authorImage } =
      await req.json();
    await main();

    const post = await prisma.posts.create({
      data: { title, content, contentImage, authorImage, authorName },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
