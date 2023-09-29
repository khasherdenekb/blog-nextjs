"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Image, Skeleton } from "@nextui-org/react";

async function fetchBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data?.Posts;
}

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const size = [1, 2];
  useEffect(() => {
    const GetBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
      setLoading(false);
    };
    GetBlogs();
  }, []);
  const router = useRouter();
  return (
    <section className="flex flex-col max-w-6xl gap-10 mb-40 md:mt-32 px-10 xl:px-0">
      <div className="flex flex-col gap-10 justify-center items-center w-full">
        {loading &&
          size.map((el, key) => {
            return (
              <div
                key={key}
                className="w-[80vw] md:w-[90%] flex items-center gap-3 justify-center"
              >
                <Skeleton className="w-screen rounded-lg h-96 md:h-full">
                  <div className="h-52 w-full rounded-lg bg-default-300" />
                </Skeleton>
              </div>
            );
          })}
      </div>
      {blogs &&
        blogs?.map((item: any, key: number) => {
          return (
            <article
              onClick={() => router.push(`/blog/${item?.id}`)}
              key={key}
              className="flex flex-col md:flex-row bg-white transition hover:shadow-xl"
            >
              <div className=" sm:block sm:basis-56">
                <Image
                  alt="Guitar"
                  src={item?.contentImage}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                  <a href="#">
                    <h3 className="font-bold uppercase text-gray-900">
                      {item?.title}
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                    {item?.content}
                  </p>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end cursor-pointer">
                  <div
                    onClick={() => router.push(`/blog${item?._id}`)}
                    className="block bg-blue-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-blue-400"
                  >
                    Read Blog
                  </div>
                </div>
              </div>
            </article>
          );
        })}
    </section>
  );
};

export default BlogCard;
