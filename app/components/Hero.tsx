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
    <div className="grid grid-cols-1 1000px:grid-cols-2 p-12 h-auto">
      <div className="pl-14 ">
        <h2
          className="text-[40px] md:text-[60px] 
                font-bold "
        >
          OEM <span className="text-yellow-500">Parts</span> At <br /> Your Door
        </h2>
        <h2 className="800px:text-[20px] text-[16px] text-gray-500 pr-20 mt-5">
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
          width={300}
          height={400}
          priority
          className="w-full object-fit align-center 800px:pr-14 600px:pr-8 "
        />
      </div>
    </div>
  );
}

export default Hero;
