"use client";

import React from "react";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHeader from "../components/Admin/DashboardHeader";

type Props = {};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminProtected>
        {/* <div className="flex h-auto min-h-screen"> */}
        {/* <div className="1500px:w-[16%] w-1/5"> */}
        <div className="w-full h-auto min-h-screen flex ">
          <AdminSidebar />
          <div className="w-full p-5">
            <DashboardHeader />

            {children}
          </div>
        </div>
        {/* </div> */}
      </AdminProtected>
    </div>
  );
};

export default DashboardLayout;
