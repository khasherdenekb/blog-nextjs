"use client";
import { Image, User, Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { blogType } from "@/types";

const BlogDetail = () => {
  const pathName = usePathname();
  const [blogDetail, setBlogDetail] = useState<blogType>();
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getBlogPost = async (id: string) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          setIsError(true);
        } else {
          const data = await res.json();
          setBlogDetail(data?.post);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBlogPost(pathName.split("/")[2]);
  }, []);

  if (isError) {
    return <div>Article not found id is wrong</div>;
  }

  return (
    <section className="flex flex-col max-w-6xl gap-10 mb-20 justify-center items-center">
      <Image
        className="md:h-[33em] w-screen object-cover px-10 lg:px-0"
        alt="NextUI hero Image"
        src={blogDetail?.contentImage}
      />
      <div className="flex max-w-6xl flex-col  px-10 w-screen items-start gap-3 lg:px-0">
        <User
          name={blogDetail?.authorName}
          description={<div>{blogDetail?.date.slice(0, 10)}</div>}
          avatarProps={{
            src: blogDetail?.authorImage,
          }}
        />
        <p>{blogDetail?.title}</p>
      </div>

      <div className="px-10 xl:px-0">
        <Card className="p-3">{blogDetail?.content}</Card>
      </div>
    </section>
  );
};

export default BlogDetail;
