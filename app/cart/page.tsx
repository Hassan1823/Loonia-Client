"use client";

// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUserCartQuery, useDeleteItemFromCartMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../utils/Heading";

// Define the CartItem type
type CartItem = {
  hrefNames: string;
  hrefNumbers: string;
  hrefPrices: string;
  _id: string; // Ensure to include the _id field used in handleDeleteItem
};

// Define the Page component
const Page: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data, isLoading, isSuccess, refetch } = useUserCartQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isSuccess && data) {
      setCartData(data.products);
    }
  }, [data, isSuccess]);

  const [deleteItemFromCart] = useDeleteItemFromCartMutation();

  const handleDeleteItem = async (id: string) => {
    await deleteItemFromCart(id);
    toast.success(`Product Deleted`);
    refetch();
  };

  useEffect(() => {
    let newTotal = 0;
    cartData.forEach((item) => {
      const price = parseFloat(item.hrefPrices.replace("$", ""));
      newTotal += price;
    });
    setTotalPrice(newTotal);
  }, [cartData]);


  return (
    <>
      <div className="w-full min-h-screen h-auto">
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
          cartLength={cartData.length}
        />

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
                        // handleTotalPrice(item.hrefPrices);
                        return (
                          <tr
                            key={index}
                            className="w-1/6 px-4 py-2 text-center hover hover:scale-[103%] duration-200"
                          >
                            <td>{index + 1}</td>
                            <td>{item.hrefNames}</td>
                            <td>{item.hrefNumbers}</td>
                            <td>{item.hrefPrices}</td>
                            <td>
                              <button
                                onClick={() => handleDeleteItem(id)}
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
                    <span className="text-yellow-500"> $ {totalPrice.toFixed(2)}</span>
                  </strong>
                </div>
              </>
            )}
          </div>

          {cartData.length !== 0 && (
            <div className="w-full h-auto flex justify-center items-center my-10">
              <button
                className="bg-yellow-500 text-white lg:px-6 px-3 lg:py-3 py-2 rounded-lg hover:bg-yellow-600 hover:scale-110 hover:duration-300 "
                // onClick={() => handleCheckOut()}
              >
                Checkout
              </button>
            </div>
          )}
        </div>

        {/* ! cart main part ends here */}
        <Footer />
      </div>
    </>
  );
};

export default Page;
