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
      {/* main div starts here */}
      <div className="w-full min-h-screen">
        <div className="">
          <h1 className="text-3xl font-bold text-yellow-500 text-center my-5">
            About
          </h1>
          <p className="w-[60%] mx-auto text-center text-md">{`Ensuring the utmost privacy of your banking information is our top priority. We have implemented robust measures to ensure that we do not store any of your sensitive bank details. Moreover, we are pleased to offer a repayment guarantee of up to 25 USD, demonstrating our commitment to your financial security and satisfaction.`}</p>
        </div>
        <div className="my-4">
          {/* <h1 className="text-3xl font-bold text-yellow-500 text-center my-5">
            About
          </h1> */}
          <p className="w-[60%] mx-auto text-center text-md">{`Lunia Traders proudly offer nationwide delivery of genuine OEM parts for all imported Japanese cars, ensuring a level of security that's second to none. Your prized automotive possessions are in safe hands!
`}</p>
        </div>
        <div className="my-4">
          {/* <h1 className="text-3xl font-bold text-yellow-500 text-center my-5">
            About
          </h1> */}
          <p className="w-[60%] mx-auto text-center text-md">{`Certainly! Loonia Traders stands as a prominent player in the automotive industry, specializing in the provision of genuine parts for a wide range of Japanese imported cars nationwide. With an extensive inventory boasting hundreds of thousands of components, they ensure that even in the event of a shortage, they possess the capability to promptly source the required parts directly from the manufacturers. This distinctive capability is further underscored by their direct affiliations with renowned automotive giants such as Toyota, Lexus, Infiniti, Mazda, Mitsubishi, and Honda. This network undoubtedly positions Loonia Traders as a reliable and indispensable resource for the procurement of authentic components, solidifying their status as a leading force in the domain of Japanese automotive parts distribution.
`}</p>
        </div>
      </div>
      {/* main div ends here */}
      <Footer />
    </div>
  );
};

export default Page;
