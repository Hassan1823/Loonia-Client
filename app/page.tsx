"use client";

import { FC, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchInput from "./components/SearchInput";
import Heading from "./utils/Heading";
import CheckPart from "./components/CheckPart";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  // ! get all products
  // const { isLoading, data, error } = useGetAllProductsQuery({});
  // console.log(data.products ? data.products : "Products");

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

      <Hero />
      <SearchInput />
      {/* <CheckPart /> */}

      <Footer />
    </div>
  );
};

export default Page;
