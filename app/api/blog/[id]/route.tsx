import { connectToDb } from "@/utils/db";
import Post from "@/model/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: string | any) {
  const { id } = params;
  await connectToDb();
  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}
