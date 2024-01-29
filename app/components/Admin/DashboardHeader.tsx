"use client";

import { useGetNotificationsQuery } from "@/redux/features/admin/adminSlice";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {};

const DashboardHeader = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { data, isSuccess, error } = useGetNotificationsQuery({});
  useEffect(() => {
    if (isSuccess) {
      console.log(`Notifications Are :`);
      console.log(data.notifications);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, isSuccess]);

  const currentTime = new Date();

  return (
    <div className="w-full flex z-50 items-center justify-end p-6 fixed top-5 right-0">
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-white" />
        <span className="absolute -top-2 -right-2 bg-yellow-500 rounded-full w-[20px] text-[12px] flex items-center justify-center text-black font-semibold">
          {data ? data.notifications.length : 0}
        </span>
      </div>
      {open && (
        <div className="w-[30vw] h-[50vh] bg-slate-950 border shadow-xl absolute top-16 z-10 rounded px-2 overflow-y-auto">
          <h5 className="text-center text-[20px] text-yellow-500 p-3 cursor-pointer">
            Notifications
          </h5>
          {data && (
            <>
              {data.notifications.map((item: any, index: number) => {
                return (
                  <div
                    className="bg-[#2d3a4ea1] border-b border-b-[#ffffff47] rounded-md mb-2 h-auto pb-3"
                    key={index}
                  >
                    <div className="w-full flex items-center justify-between p-2">
                      <p className="text-yellow-500">{item.title}</p>
                      <p className="text-yellow-500 cursor-pointer">
                        {item.status === "unread"
                          ? "Mark as Read"
                          : "Mark as Unread"}
                      </p>
                    </div>
                    <p className="px-2 text-white">{item.message}</p>
                    <p className="px-2 text-yellow-500 text-[14px] mt-1">
                      {(() => {
                        const hoursDifference =
                          (currentTime.getTime() -
                            new Date(item.updatedAt).getTime()) /
                          (1000 * 60 * 60);
                        if (hoursDifference < 24) {
                          return `${hoursDifference.toFixed(0)} hours ago`;
                        } else {
                          const daysDifference = hoursDifference / 24;
                          return `${daysDifference.toFixed(0)} days ago`;
                        }
                      })()}
                    </p>
                  </div>
                );
              })}
            </>
          )}
          {/* <div className="bg-[#2d3a4ea1] border-b border-b-[#ffffff47] rounded-md mb-2 h-auto pb-3">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-yellow-500">New Question Received</p>
              <p className="text-yellow-500 cursor-pointer">Mark as read</p>
            </div>
            <p className="px-2 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, nostrum.
            </p>
            <p className="px-2 text-yellow-500 text-[14px] mt-1">5 days ago</p>
          </div>
          <div className="bg-[#2d3a4ea1] border-b border-b-[#ffffff47] rounded-md mb-2 h-auto pb-3">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-yellow-500">New Question Received</p>
              <p className="text-yellow-500 cursor-pointer">Mark as read</p>
            </div>
            <p className="px-2 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, nostrum.
            </p>
            <p className="px-2 text-yellow-500 text-[14px] mt-1">5 days ago</p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
