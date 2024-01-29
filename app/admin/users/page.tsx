"use client";

import Heading from "@/app/utils/Heading";
import React, { useEffect } from "react";
import { useGetUsersQuery } from "@/redux/features/admin/adminSlice";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader";

type Props = {};

const UsersDashboard = (props: Props) => {
  const { data, isSuccess, isLoading, error } = useGetUsersQuery({});
  useEffect(() => {
    if (isSuccess) {
      console.log(`All Users Are : `);
      console.log(data.users);
    }
    if (error) {
      console.log(error)
    }
  }, [isSuccess, data, error]);
  return (
    <>
      <Heading
        title="Users"
        description="Loonia Traders Admin Dashboard"
        keywords="loonia traders, admin, dashboard, carparts"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-flex-1 h-auto">
          <h1 className="text-3xl font-[500] hover:shadow-sm text-center cursor-default text-yellow-500">All Users</h1>
          <table className="table w-full mb-6 px-4 mr-[4%] pt-12 mt-8">
            <thead>
              <tr className="w-1/6 px-4 py-2 text-center text-yellow-500 text-lg">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                <>
                  {data.users.map((user: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className="w-1/6 px-4 py-2 text-center hover hover:scale-[103%] duration-200 cursor-default"
                      >
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>No Users Available</>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UsersDashboard;
