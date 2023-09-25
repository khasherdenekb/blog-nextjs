import { SignOutButton } from "@clerk/nextjs";
import React from "react";

const HeroCard = () => {
  return (
    <section className="flex flex-col md:flex-row max-w-6xl gap-10 mb-40 md:mt-48 px-10 lg:px-0">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
          Understand and Read
          <span className="sm:block"> Increase Your Knowledge </span>
        </h1>

        <p className="mx-auto mt-2 max-w-xl sm:text-xl/relaxed">
          Google Translate was used to translate into Mongolian
        </p>
        <p className="mx-auto max-w-xl sm:text-xl/relaxed">
          Scroll down to read the blogs
        </p>

        <a
          href="https://linktr.ee/khasherdene"
          target="_blank"
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <div className="text-white hover:text-black block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium  hover:bg-transparent focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
            Contact Me
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroCard;
