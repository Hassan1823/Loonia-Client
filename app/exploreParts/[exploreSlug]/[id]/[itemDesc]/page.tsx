"use client";

import Loader from "@/app/components/Loader";
import { useGetProductCardsQuery, useGetSingleProductQuery } from "@/redux/features/products/productApi";
import React, { useEffect } from "react";
// import { usePathname } from "next/navigation";

type Props = {};

const Page = ({ params }: any) => {
  const schema = params;
  const id = schema.id;
  //     console.log(id)
  const item = schema.itemDesc.replaceAll("%20", " ").trim();
  console.log(item);
  //   const pathname = usePathname();

  

  const { isLoading, isSuccess, data } = useGetProductCardsQuery(id);
  useEffect(() => {
    if (isSuccess) {
      console.log(data.product);
    }
  }, [isSuccess, data]);

  return (
    <>
      {/* main container */}
      <div className="w-full min-h-screen h-auto flex flex-col lg:px-32 md:px-12 px-4 text-center justify-center">
        {/* heading */}
        <h1 className="lg:text-4xl text-2xl font-semibold text-yellow-500 py-6">
          Choose schema for
        </h1>
        <h1 className="lg:text-2xl md:text-xl text-lg font-semibold text-yellow-500">
          {schema ? item : "Nothing To Show"}
        </h1>
        {/* parts cards */}

        <div className="w-full h-auto flex items-center justify-center gap-2 my-6">
          {isLoading && !isSuccess ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {data && (
                <>
                  {data.product.ListOfHrefs.map((item: any, index: number) => {
                    const tag = item.H1Tag.trim();
                    return <p key={index}>{tag}</p>;
                    //   if (item === item.H1Tag) {
                    //   }
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
