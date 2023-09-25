"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BlogCard = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to get post");
        } else {
          const data = await res.json();
          setBlogs(data?.posts);
        }
      } catch (error) {
        throw new Error("Failed to get post");
      }
    };
    getBlogs();
  }, []);
  return (
    <section className="flex flex-col max-w-6xl gap-10 mb-40 md:mt-32 px-10 lg:px-0">
      {blogs &&
        blogs?.map((item: any, key: number) => {
          return (
            <article
              key={key}
              className="flex flex-col md:flex-row bg-white transition hover:shadow-xl"
            >
              <div className=" sm:block sm:basis-56">
                <img
                  alt="Guitar"
                  src={item?.coverImg}
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
                    {item.descriptionEN}
                  </p>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end cursor-pointer">
                  <div
                    onClick={() => router.push(`blog/${item?._id}`)}
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
