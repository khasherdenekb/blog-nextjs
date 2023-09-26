"use client";
import React, { useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
const AdminPage = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState({
    title: "",
    descriptionEN: "",
    descriptionMN: "",
    coverImg: "",
    author: "",
    authorImg: "",
  });
  const handleSubmit = async () => {
    try {
      const res = await fetch(`https://blogkx.vercel.app/api`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: blogData.title,
          descriptionEN: blogData.descriptionEN,
          descriptionMN: blogData.descriptionMN,
          coverImg: blogData.coverImg,
          date: Date.now,
          author: blogData.author,
          authorImg: blogData.authorImg,
        }),
      });
      if (res.ok) {
        router.push("/");
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
          value={blogData.descriptionEN}
          onChange={(e) =>
            setBlogData({ ...blogData, descriptionEN: e.target.value })
          }
          label="English Content"
          labelPlacement="outside"
          placeholder="Enter your english content"
          className="max-w-7xl"
        />
        <Textarea
          value={blogData.descriptionMN}
          onChange={(e) =>
            setBlogData({ ...blogData, descriptionMN: e.target.value })
          }
          label="Mongolian Content"
          labelPlacement="outside"
          placeholder="Enter your mongolian content"
          className="max-w-7xl"
        />
        <Textarea
          value={blogData.author}
          onChange={(e) => setBlogData({ ...blogData, author: e.target.value })}
          label="Author name"
          labelPlacement="outside"
          placeholder="Author name"
          className="max-w-7xl"
        />
        <Textarea
          value={blogData.coverImg}
          onChange={(e) =>
            setBlogData({ ...blogData, coverImg: e.target.value })
          }
          label="Cover image"
          labelPlacement="outside"
          placeholder="Cover image"
          className="max-w-7xl"
        />
        <Textarea
          value={blogData.authorImg}
          onChange={(e) =>
            setBlogData({ ...blogData, authorImg: e.target.value })
          }
          label="Author image"
          labelPlacement="outside"
          placeholder="Author image"
          className="max-w-7xl"
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
  return <div>Can't access admin AdminPage</div>;
};

export default AdminPage;
