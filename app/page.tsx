"use client";

import { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="">
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

      <Hero />
    </div>
  );
};

export default Page;
