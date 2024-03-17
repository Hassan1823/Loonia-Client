"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="w-full min-h-screen h-auto">
      <Heading
        title="Loonia Traders"
        description="This is the car parts place where you can find all parts"
        keywords="car parts, loonia traders, parts"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className="w-full min-h-screen">
        <h1 className="text-3xl font-bold text-yellow-500 text-center my-5">
          Privacy
        </h1>
        <p className="w-[60%] mx-auto text-center text-lg">
          {`Feel free to reach out with any inquiries. If you're having trouble or unsure about a specific part number, you can provide a description of the part, and our team will assist you in finding the exact match.`}
        </p>
      </div>
    </div>
  );
};

export default Page;
