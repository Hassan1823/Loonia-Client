"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Loader from "../components/Loader";
import { categoriesData } from "../data/data";

type Props = {};

const Page: React.FC<Props> = (props) => {
  // const [open, setOpen] = useState(false);
  // const [activeItem, setActiveItem] = useState(0);
  // const [route, setRoute] = useState("Login");

  const [selectManufacture, setSelectManufacturer] = useState("Toyota");
  // const [selectYear, setSelectYear] = useState("");

  const pathname = usePathname();

  // Function to check and log tags
  function findTags(categoriesData: any, selectManufacture: any) {
    const matchingTags = [];
    for (const category of categoriesData) {
      if (category.name === selectManufacture) {
        matchingTags.push(...category.tags);
      }
    }
    return matchingTags;
  }

  const tempVariable = selectManufacture.trim();
  const tagsArray = findTags(categoriesData, tempVariable);

  // handle manufacturer
  const handleManufacturerChange = (e: any) => {
    setSelectManufacturer(e.target.value); // Update the selectedManufacturer state with the selected option
  };

  // reduce to letter
  const categoriesByLetter = tagsArray.reduce((acc, category) => {
    const firstLetter = category[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(category);
    return acc;
  }, {});

  const categoriesList = Object.entries(categoriesByLetter).map(
    ([letter, categories]) => (
      <div
        key={letter}
        className="w-full h-auto flex flex-wrap justify-start items-center text-white"
      >
        <h2 className="font-bold mr-4 text-yellow-500">{letter}</h2>
        {(categories as any).map((category: any) => (
          <Link
            href={`${pathname}/${selectManufacture + " " + category}`}
            passHref
            key={category}
            className="mr-4 my-2 hover:cursor-pointer hover:text-yellow-600"
          >
            {category}
          </Link>
        ))}
      </div>
    )
  );

//   console.log("Main Cat : ", categoriesByLetter);

  return (
    <div className="w-fullh-auto">
     

      {/* --------------------------------------- */}
      {/* main layout */}

      <div className="w-full h-auto">
        {/* filterr */}
        <div className="mt-5">
          <h2 className="text-center text-[20px] text-yellow-400 mb-3">
            Choose Your Brand
          </h2>
          <div className="flex justify-center px-6">
            {/* bg */}
            <div className="flex bg-yellow-500 p-1 px-3 gap-2 divide-x divide-black rounded-full ">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>

                <select
                  className="select select-bordered w-full max-w-xs bg-yellow-500"
                  value={selectManufacture} // Set the selected value of the select element to the state variable
                  onChange={handleManufacturerChange} // Handle the change event
                >
                  <option disabled>Manufacturer</option>
                  <option>Toyota</option>
                  <option>Lexus</option>
                  <option>Mitsubishi</option>
                  <option>Honda</option>
                  <option>Mazda</option>
                  <option>Nissan</option>
                  <option>Infiniti</option>
                  <option>Subaru</option>
                  <option>Suzuki</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* remaining data*/}
        <div className="p-4 px-8">
          {categoriesList.length !== 0 ? (
            categoriesList
          ) : (
            <>
              <Loader />
            </>
          )}
        </div>
      </div>

      {/* --------------------------------------- */}
    </div>
  );
};

export default Page;
