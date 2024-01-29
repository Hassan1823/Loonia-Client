"use client";

import Loader from "@/app/components/Loader";
import { useGetSubCategoriesProductsQuery } from "@/redux/features/products/productApi";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import dummyImage from "@/public/dummy.webp";

type Props = {};

const Page: React.FC<Props> = ({ params }: any) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  const id = params?.exploreSlug;
  const category = id.replaceAll("%20", " ");
  const pathname = usePathname();
  console.log(category);

  const { isLoading, isSuccess, data } = useGetSubCategoriesProductsQuery(id);

  useEffect(() => {
    if (isSuccess) {
      console.log(`Data is ${data.productNames}`);
    } else {
      console.log(`No data found`);
    }
  }, [isSuccess, data]);

  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
    // console.log(`Image Error is : ${imageError}`);
  };

  return (
    <div className="w-full min-h-screen h-auto">
      <Heading
        title={category}
        description={`This is the ${category} car with the id of ${id}`}
        keywords={`loonia traders, car parts, parts for ${category}, parts for ${id}, ${category} for ${id}`}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : !isLoading && data ? (
          <>
            <div className="w-full min-h-screen h-auto lg:px-32 md:px-12 px-6 flex flex-col justify-start gap-6 py-6">
              {/* heading */}
              <h1 className="lg:text-4xl text-2xl font-semibold text-yellow-500">
                {`${category}`}
              </h1>
              {data?.productNames.length === 0 ? (
                <h1 className="lg:text-2xl text-lg font-light text-gray-500 w-full min-h-screen">
                  {"No Data Found"}
                </h1>
              ) : (
                <h1 className="lg:text-2xl text-lg font-light ">
                  {"Choose generation by production years:"}
                </h1>
              )}

              {/* cards starts here*/}
              <div className="w-full h-auto grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 place-items-center gap-4 md:gap-6 lg:gap-10">
                {data.productNames.map((data: any, index: number) => {
                  return (
                    <div key={index}>
                      {/* {data.parentTitle === categ && ( */}
                      <Link
                        href={`${pathname}/${data._id}`}
                        passHref
                        // onClick={() => router.push(`${pathname}/${data.Frames}`)}
                        className="w-48 h-60 rounded-md hover:shadow-xl flex flex-col justify-start items-center text-[0.75rem] text-[#A5A5A5] hover:cursor-pointer"
                      >
                        {/* {imageLoading ? (
                          <span className="loading loading-infinity loading-md"></span>
                        ) : ( */}
                        <img
                          src={imageError ? dummyImage : data.ImageLink}
                          alt={data.Frames}
                          // width={150}
                          height={100}
                          onError={handleImageError}
                          className=" object-contain rounded-md my-4 lg:w-56 md:w-44 w-36 border"
                        />
                        {/* // )} */}

                        <span className="text-yellow-500 hover:text-white">
                          {data.Family}
                        </span>
                        <span className="text-white hover:text-yellow-500">
                          {data.Years}
                        </span>
                        {/* <span className="truncate">{data.Frames}</span> */}
                        {/* <span className="text-white hover:text-yellow-500 mx-auto text-center">{data.Frames}</span> */}
                        <span className="text-white hover:text-yellow-500">
                          {data.Generation}
                        </span>
                      </Link>
                      {/* )} */}
                    </div>
                  );
                })}
              </div>

              {/* cards ends here*/}
            </div>
          </>
        ) : (
          <h1 className="lg:text-2xl text-lg font-light text-gray-500">
            {"No Data Found"}
          </h1>
        )}
      </>
    </div>
  );
};

export default Page;
