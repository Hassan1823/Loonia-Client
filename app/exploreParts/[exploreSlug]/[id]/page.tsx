"use client";
import Loader from "@/app/components/Loader";
import { useGetSingleProductQuery } from "@/redux/features/products/productApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

const partsGroup = [
  {
    src: "https://www.amayama.com/i/catalogs/group_1.png",
    desc: " Engine , fuel system and tools ",
  },
  {
    src: "https://www.amayama.com/i/catalogs/group_3.png",
    desc: " Body and interior ",
  },
  {
    src: "https://www.amayama.com/i/catalogs/group_2.png",
    desc: " Chassis and transmission ",
  },
  {
    src: "https://www.amayama.com/i/catalogs/group_4.png",
    desc: " Electrics ",
  },
];

const Page = ({ params }: any) => {
  const id = params?.id;
  const { isSuccess, isLoading, data } = useGetSingleProductQuery(id);
  const [family, setFamily] = useState("");

  const pathname: any = usePathname();

  let path = pathname?.replace("/exploreParts/", "");
  path = path?.split("/");
  path = path[0].replaceAll("%20", " ");
  // console.log(path);

  useEffect(() => {
    if (isSuccess) {
      let pFamily = data.product.Frames.trim();
      let familyArray = pFamily.split(", ");
      pFamily = familyArray[0];
      setFamily(pFamily);
    }
  }, [isSuccess, data]);

  return (
    <div className="w-full min-h-screen h-auto lg:px-32 px-4 flex flex-col gap-8">
      <h1 className="lg:text-3xl text-lg text-yellow-500 font-semibold py-6">
        {data ? (
          <>{data.product.BreadcrumbsH1}</>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <span className="text-slate-400 "> No data found for </span>{" "}
              {path}
            </div>
          </>
        )}
      </h1>

      {/* parts group starts here */}

      <div className="w-full h-auto flex lg:justify-start justify-center flex-wrap gap-8">
        {isLoading && !data ? (
          <>
            <Loader />
          </>
        ) : isSuccess ? (
          <>
            <div className="h-auto w-full flex flex-wrap justify-evenly gap-8 items-center">
              <div className="w-48 h-60 rounded-md hover:shadow-xl flex flex-col justify-start items-center text-[0.75rem] text-[#A5A5A5] hover:cursor-not-allowed ">
                <img
                  src={data.product.ImageLink}
                  alt="cars"
                  width={180}
                  height={48}
                  className="object-contain rounded-md my-4"
                />
                <span className="text-yellow-600">{family}</span>
                <span>{data.product.Years}</span>
                <span>{data.product.Generation}</span>
              </div>
              {/* parts group grid starts here  */}
              <div className="flex flex-col gap-2 my-8">
                <h1 className="lg:text-2xl text-base">Choose parts group:</h1>
                {/* parts */}
                <div className="w-full h-auto flex flex-wrap lg:justify-start justify-center gap-4 hover:cursor-pointer my-4">
                  {partsGroup?.map((item: any, index: number) => {
                    let href = data.product.ListOfHrefs[index].H1Tag === undefined ? data.product.ListOfHrefs[index].h1Tag : data.product.ListOfHrefs[index].H1Tag;

                    return (
                      <Link
                        href={`${pathname}/${href}`}
                        passHref
                        key={index}
                        className="hover:shadow-xl w-44 h-44 rounded-md text-yellow-500 hover:text-yellow-600 font-medium flex flex-col justify-start text-center items-center gap-2 hover:scale-105 hover:duration-300 hover:bg-slate-100 hover:bg-opacity-10 p-1"
                      >
                        <Image
                          src={`${item.src}`}
                          alt={item.desc}
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                        <span>{item.desc}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-8 pb-20 w-full">
                <h1 className="lg:text-lg text-sm font-medium text-yellow-500">
                  Frames
                </h1>
                <p className="lg:text-sm text-xs leading-5">
                  {data.product.Frames}
                </p>

                <h1 className="lg:text-lg text-sm font-medium text-yellow-500">
                  {data.product.TypesDiv}
                </h1>
                <p className="lg:text-sm text-xs leading-5">
                  {data.product.TextsDiv}
                </p>
              </div>
              {/* parts group grid ends here  */}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <span className="text-slate-400 "> Something Went Wrong </span>
            </div>
          </>
        )}
      </div>

      {/* parts group ends here */}
    </div>
  );
};

export default Page;
