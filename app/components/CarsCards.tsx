import {
  useGetAllProductsQuery
} from "@/redux/features/products/productApi";
import Link from "next/link";
import React from "react";
import Loader from "./Loader";

type Props = {
  selectManufacture: string;
};

const CarsCards: React.FC<Props> = ({ selectManufacture }) => {
  const { isLoading, data } = useGetAllProductsQuery({});
  

  // console.log(data?.products);

  return (
    <div className="w-full min-h-screen h-auto">
      {/* cards cards start here*/}

      {isLoading && !data ? (
        <>
          <Loader />
        </>
      ) : !isLoading && data ? (
        <div className="w-full h-auto grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 place-items-center gap-4 md:gap-6 lg:gap-10 py-10">
          {data &&
            data?.products.slice(0, 15).map((data: any, index: number) => (
              <div className="" key={index}>
                <Link
                  href={`/exploreParts/${data._id}`}
                  passHref
                  className="w-48 h-60 rounded-md hover:shadow-xl flex flex-col justify-start items-center text-[0.75rem] text-[#A5A5A5] hover:cursor-pointer"
                >
                  <img
                    src={data.ImageLink}
                    alt={data.Frames}
                    // width={100}
                    height={100}
                    className=" object-contain rounded-md my-4 lg:w-56 md:w-44 w-36 border"
                  />
                  <span className="text-white hover:text-yellow-500">
                    {data.Family}
                  </span>
                  <span className="text-yellow-500 hover:text-white">
                    {data.ParentTitle}
                  </span>
                  <span className="text-white hover:text-yellow-500">
                    {data.Years}
                  </span>
                </Link>
              </div>
            ))}
        </div>
      ) : (
        <>
          <h1 className="">No Related Data Found</h1>
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
    </div>
  );
};

export default CarsCards;
