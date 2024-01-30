"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Hero() {
  const router = useRouter();

  const handleNavigae = () => {
    router.push("/exploreParts");
  };

  return (
    <div className="grid grid-cols-1 1000px:grid-cols-2 place-items-center p-12 h-auto">
      <div className="flex flex-col justify-center items-start pl-12">
        <h2
          className="text-4xl leading-normal md:text-[60px] 
                font-bold "
        >
          OEM <span className="text-yellow-500">Parts</span> At <br /> Your Door
        </h2>
        <h2 className="800px:text-lg text-md text-gray-500 pr-20 mt-5">
          Choose your car parts and place order
        </h2>
        <button
          className="p-2 mt-5 bg-yellow-500 text-white
                px-4 rounded-full 
                hover:scale-105 transition-all my-8 text-center"
          onClick={handleNavigae}
        >
          Explore Parts
        </button>
      </div>
      <div>
        <Image
          src={require("../../public/car.png")}
          alt="hero"
          width={650}
          height={200}
          priority
          className="object-fit align-center"
        />
      </div>
    </div>
  );
}

export default Hero;
