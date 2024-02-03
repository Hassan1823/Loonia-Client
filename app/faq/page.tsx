"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
          FAQ
        </h1>
        <p className="w-[60%] mx-auto text-center text-lg">
          {`You may submit your order using either the specific part number or the Vehicle Identification Number (VIN) of your Japanese car. Rest assured, we will dispatch the authentic parts accordingly.`}
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
