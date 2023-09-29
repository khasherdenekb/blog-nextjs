"use client";
import React, { useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";

const AdminPage = () => {
  const [blogData, setBlogData] = useState<any>({
    title: "",
    content: "",
    contentImage: "",
    authorImage: "",
    authorName: "",
  });
  const uploadImageToCloudinary = async (
    image: object,
    preset: string | undefined,
    imageType: string
  ) => {
    const data: any = new FormData();
    data.append("file", image);
    data.append("upload_preset", preset);
    data.append("cloud_name", process.env.CLOUDNAME_ENV);

    await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDNAME_ENV}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((responseData) => {
        setBlogData({ ...blogData, [imageType]: responseData.url });
      });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/blog`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: blogData.title,
          content: blogData.content,
          authorName: blogData.authorName,
          contentImage: blogData.contentImage,
          authorImage: blogData.authorImage,
        }),
      });
      if (res.ok) {
        setBlogData({
          title: "",
          content: "",
          contentImage: "",
          authorImage: "",
          authorName: "",
        });
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error: any) {
      throw new Error("Failed to create a post", error);
    }
  };
  const { user } = useUser();
  if (user?.organizationMemberships[0]?.role === "admin") {
    return (
      <section className="w-96">
        <Textarea
          value={blogData.title}
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          label="Title"
          labelPlacement="outside"
          placeholder="Enter your title"
          className="max-w-7xl"
        />
        <Textarea
          value={blogData.content}
          onChange={(e) =>
            setBlogData({ ...blogData, content: e.target.value })
          }
          label="Content"
          labelPlacement="outside"
          placeholder="Enter your content"
          className="max-w-7xl"
        />
        <Textarea
          value={blogData.authorName}
          onChange={(e) =>
            setBlogData({ ...blogData, authorName: e.target.value })
          }
          label="Author name"
          labelPlacement="outside"
          placeholder="Author name"
          className="max-w-7xl"
        />
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Author Image
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={(e: any) => {
            {
              uploadImageToCloudinary(
                e?.target.files[0],
                process.env.UPLOAD_ENV,
                "authorImage"
              );
            }
          }}
        />
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Content Image
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={(e: any) => {
            uploadImageToCloudinary(
              e?.target.files[0],
              process.env.UPLOAD_ENV,
              "contentImage"
            );
          }}
        />
        <Button
          onClick={() => handleSubmit()}
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg m-2"
        >
          Submit
        </Button>
      </section>
    );
  }
  return <>Can't access admin AdminPage</>;
};

export default AdminPage;
