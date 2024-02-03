"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useAddToCartMutation } from "@/redux/features/order/orderApi";
import toast from "react-hot-toast";

import dummyImage from "../../public/dummy.webp";
import { useUserCartQuery } from "@/redux/features/user/userApi";

type Props = {
  selectSearchType: string;
  // searchValue: string;
  products: any;
  isLoading: boolean;
  framesProduct: any;
  partState: any;
  productsLength: number;
  handleLoadMore: () => void;
  handleLoadPrev: () => void;
  prev: number;
  current: number;
};

const CarsCards: React.FC<Props> = ({
  selectSearchType,
  // searchValue,
  products,
  isLoading,
  framesProduct,
  partState,
  productsLength,
  handleLoadMore,
  handleLoadPrev,
  prev,
  current,
}) => {
  // ! image loader
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  // ! image loader

  const [productLimit, setProductLimit] = useState(10);

  // existing code...

  // const handleLoadMore = () => {
  //   setProductLimit((prevLimit) => prevLimit + 10);
  // };

  useEffect(() => {
    console.log(
      framesProduct.length !== 0 ? framesProduct : "no data for frames"
    );
    console.log(partState && partState);
  }, [framesProduct, partState]);

  // Calculate the 20% values before rendering
  const calculateTwentyPercent = (value: any) => {
    const floatValue = parseFloat(value.replace(/,/g, ""));
    if (isNaN(floatValue)) {
      return value; // If not a valid float, return the original value
    } else {
      const twentyPercent = floatValue * 0.2;
      const sumValue = floatValue + twentyPercent;

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(sumValue);
    }
  };

  const { refetch: refetchCart } = useUserCartQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [addToCart, { isSuccess: addToCartSuccess, error: addToCartError }] =
    useAddToCartMutation({});

  useEffect(() => {
    if (addToCartSuccess) {
      refetchCart();
      toast.success(`Added to Cart`);
    }
    if (addToCartError) {
      if ("data" in addToCartError) {
        const errorMessage = addToCartError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [addToCartSuccess, addToCartError, refetchCart]);

  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
    // console.log(`Image Error is : ${imageError}`);
  };

  return (
    <div className="w-full h-auto">
      {/* cards cards start here*/}

      {selectSearchType === "Chassis" ? (
        <>
          {" "}
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : framesProduct.length !== 0 ? (
            <div className="w-full h-auto flex justify-center items-center py-10">
              {framesProduct &&
                framesProduct.slice(0, 1).map((data: any, index: number) => {
                  // title
                  let pTitle = data.BreadcrumbsH1.trim();
                  let pTitleArray = pTitle.split(" ");
                  pTitle = pTitleArray[0] + " " + pTitleArray[1];

                  // family
                  let family = data.Frames.trim();
                  let familyArray = family.split(", ");
                  family = familyArray[0];
                  return (
                    <div className="" key={index}>
                      <Link
                        href={`/exploreParts/${pTitle}/${data._id}`}
                        passHref
                        className="w-48 h-60 rounded-md hover:shadow-xl flex flex-col justify-start items-center text-[0.75rem] text-[#A5A5A5] hover:cursor-pointer"
                      >
                        <Image
                          src={imageError ? dummyImage : data.ImageLink}
                          alt={family}
                          width={300}
                          height={100}
                          onError={handleImageError}
                          className=" object-contain rounded-md my-4 border"
                        />
                        <span className="text-yellow-500 hover:text-white">
                          {data.ParentTitle ? data.ParentTitle : pTitle}
                        </span>
                        <span className="text-white hover:text-yellow-500">
                          {`(${family})`}
                        </span>
                        <span className="text-white hover:text-yellow-500">
                          {data.Years}
                        </span>
                      </Link>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <h1 className="w-full min-h-screen h-auto text-center mt-24">
                Please Enter Some Value Or Their Might Be Some Error
              </h1>
            </>
          )}
          {/* cards cards end here*/}
          <div className="w-full h-auto flex justify-center">
            <Link
              href={`/exploreParts`}
              passHref
              className="p-2 mt-5 bg-yellow-500 text-white
      px-4 rounded-full 
      hover:scale-105 transition-all my-8"
            >
              Explore More
            </Link>
          </div>
        </>
      ) : selectSearchType === "Parts" ? (
        <>
          {isLoading && partState.title === "" ? (
            <Loader />
          ) : !isLoading && partState.title !== "" ? (
            <div className="w-full min-h-screen h-auto mt-12">
              <h1 className="text-3xl font-bold text-yellow-500 text-center my-5">
                Choose Your favourite Part
              </h1>
              <div className="w-full h-auto flex flex-wrap justify-evenly items-center p-4 gap-4">
                <div className="flex flex-col gap-1 w-1/2">
                  <h1 className="text-2xl font-bold text-yellow-500">
                    Details :
                  </h1>
                  {/* <h1>{partState.subcategory}</h1> */}
                  <h1>{partState.title}</h1>
                  <h1>{partState.frames}</h1>
                  <h1>{partState.h1Tag}</h1>
                </div>
                <div className="">
                  <div className="w-full h-auto flex justify-center items-center my-5">
                    <Image
                      src={imageError ? dummyImage : partState.image}
                      alt={partState.title}
                      width={350}
                      height={200}
                      onError={handleImageError}
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Table starts here */}
              <div className="overflow-x-auto border p-4 rounded-lg mt-10">
                <table className="table">
                  <thead>
                    <tr className="w-1/5 px-4 py-2 text-center">
                      <th>ID</th>
                      <th>Names</th>
                      <th>Numbers</th>
                      <th>Prices</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      className={
                        partState.partName === "Not available" ||
                        partState.partName === "Out of stock" ||
                        partState.partName === "Discontinued" ||
                        partState.partName === "-"
                          ? "cursor-not-allowed w-1/5 px-4 py-2 text-center bg-slate-700 hover:scale-[103%] duration-200"
                          : "hover hover:duration-300 cursor-pointer w-1/5 px-4 py-2 text-center hover:scale-[103%] duration-200"
                      }
                    >
                      <th>1</th>
                      <td>{partState.partName}</td>
                      <td>{partState.partNumber}</td>
                      <td>
                        {partState.partName !== "Discontinued" &&
                        partState.partName !== "Not available" &&
                        partState.partName !== "Out of stock"
                          ? calculateTwentyPercent(partState.partPrice)
                          : partState.partPrice}
                      </td>
                      <td>
                        {partState.partName !== "Discontinued" &&
                          partState.partName !== "Not available" &&
                          partState.partName !== "Out of stock" &&
                          partState.partName !== "-" && (
                            <button
                              className="bg-yellow-500 text-white rounded-md p-2 hover:scale-110 hover:duration-200 "
                              onClick={() =>
                                addToCart({
                                  productId: partState.productId,
                                  hrefNumbers: partState.partNumber,
                                  hrefNames: partState.partName,
                                  hrefPrices: calculateTwentyPercent(
                                    partState.partPrice
                                  ),
                                })
                              }
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
                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                              </svg>
                            </button>
                          )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Table ends here */}
            </div>
          ) : (
            <h1 className="w-full min-h-screen h-auto text-center mt-24">
              Please wait ...
            </h1>
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : !isLoading && products.length !== 0 ? (
            <div className="w-full h-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 place-items-center gap-4 md:gap-6 py-10">
              {products
                .slice(0, productLimit)
                .map((data: any, index: number) => {
                  // title
                  let pTitle = data.BreadcrumbsH1.trim();
                  let pTitleArray = pTitle.split(" ");
                  pTitle = pTitleArray[0] + " " + pTitleArray[1];

                  // family
                  let family = data.Frames.trim();
                  let familyArray = family.split(", ");
                  family = familyArray[0];
                  return (
                    <div className="" key={index}>
                      <Link
                        href={`/exploreParts/${pTitle}/${data._id}`}
                        passHref
                        className="w-64 h-auto rounded-md hover:shadow-xl flex flex-col justify-start items-center text-[0.75rem] text-[#A5A5A5] hover:cursor-pointer"
                      >
                        <Image
                          src={imageError ? dummyImage : data.ImageLink}
                          alt={family}
                          width={220}
                          height={100}
                          onError={handleImageError}
                          className="object-contain rounded-md my-4 border"
                        />
                        <span className="text-yellow-500 hover:text-white">
                          {data.ParentTitle ? data.ParentTitle : pTitle}
                        </span>
                        <span className="text-white hover:text-yellow-500">
                          {`(${family})`}
                        </span>
                        <span className="text-white hover:text-yellow-500">
                          {data.Years}
                        </span>
                      </Link>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <h1 className="w-full min-h-screen h-auto text-center mt-24">
                No Related Data Found
              </h1>
            </>
          )}
          {/* cards cards end here*/}

          <div className="w-full h-auto flex justify-center gap-1">
            {productsLength > 10 && (
              <button
                disabled={prev <= 0}
                onClick={handleLoadPrev}
                className={`p-2 mt-5 bg-yellow-500 text-white
        px-4 rounded-s-full 
        hover:scale-105 transition-all my-8 ${
          prev <= 0 && "cursor-not-allowed"
        }`}
              >
                Prev
              </button>
            )}
            {productsLength > 10 && (
              <button
                disabled={current >= productsLength}
                onClick={handleLoadMore}
                className={`p-2 mt-5 bg-yellow-500 text-white
        px-4  rounded-e-full
        hover:scale-105 transition-all my-8 ${
          current >= productsLength && "cursor-not-allowed"
        }`}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CarsCards;
