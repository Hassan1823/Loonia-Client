"use client";

import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import { useGetSingleProductQuery } from "@/redux/features/products/productApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const Page = ({ params }: any) => {
  const [itemDesc, setItemDesc] = useState([]);
  const [product, setProduct] = useState([]);
  const schema = params;
  const id = schema.id;
  //     console.log(id)
  let item = decodeURIComponent(schema.itemDesc).trim();
  // console.log(item);
  const pathname = usePathname();

  const { isSuccess, isLoading, data } = useGetSingleProductQuery(id);
  useEffect(() => {
    if (isSuccess) {
      setProduct(data.product);
      if (product.length !== 0) {
        data.product.ListOfHrefs.map((list: any, index: number) => {
          const tag =
            list.H1Tag !== undefined ? list.H1Tag.trim() : list.h1Tag.trim();
          // console.log(`tag: ${tag}`);
          // console.log(`tag: ${item}`);

          if (tag === item) {
            setItemDesc(list.cards);
            console.log(true);
          } else {
            console.log(false);
          }
        });
      }
      console.log(data ? product : "no data");
    }
  }, [isSuccess, data, itemDesc, item, product]);
  // console.log(itemDesc.length !== 0 ? itemDesc : "null");
  // console.log(data)

  return (
    <>
      {/* main container */}
      <div className="w-full min-h-screen h-auto flex flex-col lg:px-32 md:px-12 px-4 text-center justify-start">
        {/* heading */}
        <h1 className="lg:text-4xl text-2xl font-semibold text-yellow-500 py-6">
          Choose schema for
        </h1>
        <h1 className="lg:text-2xl md:text-xl text-lg font-semibold text-yellow-500">
          {schema ? item : "Nothing To Show"}
        </h1>
        {/* parts cards */}

        <div className="w-full h-auto flex items-center justify-center gap-2 my-12">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="w-full h-auto grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 place-items-center gap-2 sm:gap-8 lg:gap-14">
                {itemDesc.map((item: any, index: number) => {
                  return (
                    <Link
                      key={index}
                      href={`${pathname}/${item.Alt}`}
                      passHref
                      className="sm:w-48 w-auto h-56 sm:p-0 p-1 flex flex-col hover:shadow-xl hover:border hover:duration-300 hover:scale-105 hover:border-opacity-10 rounded-md items-center justify-around text-yellow-500 hover:bg-slate-100 hover:bg-opacity-10"
                    >
                      <Image
                        src={item.ImageLink}
                        alt={item.Alt}
                        width={200}
                        height={200}
                        className="object-contain rounded-md lg:w-52 md:w-44 w-40 h-40"
                      />
                      <span className="lg:text-sm text-xs">{item.Alt}</span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
