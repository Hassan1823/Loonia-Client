"use client";

import React, { FC, useEffect, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

import { checkout } from "../checkout";
import Link from "next/link";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (user) {
      setCartData(user.products);
    }
    if (cartData.length !== 0) {
      console.log(`Cart Data :`);
      console.log(cartData);
    }
  }, [cartData, user]);

  return (
    <div className="w-full min-h-screen h-auto">
      <Protected>
        <Heading
          title="Loonia Cart"
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
      </Protected>

      {/* ! cart main part starts here */}

      <div className="w-full min-h-screen h-auto my-8">
        {cartData.length >= 0 && (
          <h1 className="text-center lg:text-3xl text-xl font-semibold text-yellow-500">
            Cart Items
          </h1>
        )}

        <div className="overflow-x-auto border p-4 rounded-lg mt-10">
          {cartData.length <= 0 ? (
            <h1 className="text-center">Your Cart Is Empty</h1>
          ) : (
            <>
              <table className="table mb-6 px-4">
                <thead>
                  <tr className="w-1/6 px-4 py-2 text-center">
                    <th>ID</th>
                    <th>Names</th>
                    <th>Numbers</th>
                    <th>Prices</th>
                    {/* <th>Quantity</th> */}
                    <th>Action</th> {/* New column for action */}
                  </tr>
                </thead>
                <tbody>
                  {cartData ? (
                    cartData.map((item: any, index: number) => {
                      let id = item._id;
                      return (
                        <tr
                          key={index}
                          className="w-1/6 px-4 py-2 text-center hover hover:scale-[103%] duration-200"
                        >
                          <td>{index + 1}</td>
                          <td>{item.hrefNames}</td>
                          <td>{item.hrefNumbers}</td>
                          <td>{`$ ${item.hrefPrices}`}</td>
                          <td>
                            <button
                              // onClick={() => removeItemFromCart(index)}
                              // onClick={() => deleteRecord(id)}
                              className="bg-red-500 text-white rounded-md p-1 hover:shadow-lg hover:scale-105 hover:duration-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <Loader />
                  )}
                </tbody>
              </table>
              <div className="mt-4 text-center lg:text-3xl md:text-2xl text-xl">
                <strong>
                  <span className="text-yellow-500">Total</span> :{" "}
                  <span className="text-yellow-500">$ 999</span>
                </strong>
              </div>
            </>
          )}
        </div>

        {cartData.length !== 0 && (
          <div className="w-full h-auto flex justify-center items-center my-10">
            <Link href={"https://buy.stripe.com/test_cN25kyg10f1G5aw6op"}>
              <button
                className="bg-yellow-500 text-white lg:px-6 px-3 lg:py-3 py-2 rounded-lg hover:bg-yellow-600 hover:scale-110 hover:duration-300 "
                // onClick={()=> }
              >
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* ! cart main part ends here */}
      <Footer />
    </div>
  );
};

export default Page;
