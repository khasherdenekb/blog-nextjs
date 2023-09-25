import { connectToDb } from "@/utils/db";
import Post from "@/model/post";
import { NextResponse } from "next/server";
export async function GET() {
  await connectToDb();
  const posts = await Post.find();
  return NextResponse.json({ posts });
}
