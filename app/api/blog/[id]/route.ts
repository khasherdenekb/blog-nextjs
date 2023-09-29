import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/prisma";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.posts.findFirst({ where: { id: id } });
    if (!post)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    const { title, content, authorImage, authorName, contentImage } =
      await req.json();
    await main();
    const post = await prisma.posts.update({
      data: { title, content, authorImage, authorName, contentImage },
      where: { id },
    });
    return NextResponse.json(
      { message: "Successfully updated", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.posts.delete({ where: { id } });
    return NextResponse.json(
      { message: "Successfully deleted", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
