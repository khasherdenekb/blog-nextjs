"use client";
import { CardBody, Image, User, Card, Switch } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { blogType } from "@/types";

const BlogDetail = () => {
  const pathName = usePathname();
  const [blogDetail, setBlogDetail] = useState<blogType>();
  const [isSelected, setIsSelected] = React.useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getBlogPost = async (id: string) => {
      try {
        const res = await fetch(`https://blogkx.vercel.app//api/blog/${id}`, {
          cache: "no-store",
        });

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
        src={blogDetail?.coverImg}
      />
      <div className="flex max-w-6xl flex-col  px-10 w-screen items-start gap-3 lg:px-0">
        <User
          name={blogDetail?.author}
          description={<div>{blogDetail?.date.slice(0, 10)}</div>}
          avatarProps={{
            src: blogDetail?.authorImg,
          }}
        />
        <p>{blogDetail?.title}</p>
      </div>
      <div className="px-10 lg:px-0 ">
        <Card>
          {isSelected ? (
            <CardBody className="text-gray-400">
              {blogDetail?.descriptionMN}
            </CardBody>
          ) : (
            <CardBody className="text-gray-400">
              {blogDetail?.descriptionEN}
            </CardBody>
          )}
        </Card>
      </div>
      <div className="flex justify-start flex-col w-screen max-w-6xl px-10 lg:px-0">
        <Switch isSelected={isSelected} onValueChange={setIsSelected}>
          Translate to Mongolia
        </Switch>
      </div>
    </section>
  );
};

export default BlogDetail;
