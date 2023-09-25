import { connectToDb } from "@/utils/db";
import Post from "@/model/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    title,
    descriptionEN,
    descriptionMN,
    coverImg,
    date,
    author,
    authorImg,
  } = await request.json();
  await connectToDb();
  await Post.create({
    title,
    descriptionEN,
    descriptionMN,
    coverImg,
    date,
    author,
    authorImg,
  });
  return NextResponse.json({ message: "Post Created" }, { status: 201 });
}

export async function GET() {
  await connectToDb();
  const posts = await Post.find();
  return NextResponse.json({ posts });
}
