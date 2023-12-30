"use client";

import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";
import CreateProduct from "../../components/Admin/Product/CreateProduct";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="">
      <Heading
        title="Create New Product"
        description="This is the car parts place where you can find all parts"
        keywords="car parts, loonia traders, parts"
      />

      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default Page;
