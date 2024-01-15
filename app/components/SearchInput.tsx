"use client";

import {
  useGetAllProductsQuery,
  useGetMainTypeProductsQuery,
} from "@/redux/features/products/productApi";
import { useEffect, useState } from "react";
import CarsCards from "./CarsCards";

type PartsType = {
  partName: string;
  partPrice: string;
  partNumber: string;
  image: string;
  frames: string;
  h1Tag: string;
  subcategory: string;
  title: string;
};

const partsInitialState: PartsType = {
  partName: "",
  partPrice: "",
  partNumber: "",
  image: "",
  frames: "",
  h1Tag: "",
  subcategory: "",
  title: "",
};

function SearchInput() {
  const [selectManufacture, setSelectManufacturer] = useState("Toyota");
  const [selectSearchType, setSelectSearchType] = useState("Categories");
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);

  const [framesProduct, setFramesProduct] = useState([]);
  const [partsProduct, setPartsProduct] = useState([]);
  const [partsIndex, setPartsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [partState, setPartState] = useState<PartsType>(partsInitialState);

  // ! search by main types starts here
  const { data, isError, refetch } = useGetMainTypeProductsQuery({
    type: selectManufacture,
  });

  useEffect(() => {
    // const fetchData = async () => {
    //   console.log(`Main Type is : ${selectManufacture}`);
    //   setIsLoading(true);
    //   console.log(`Loading ...`);
    //   await refetch();
    //   setIsLoading(false);
    //   console.log(`Loading Complete`);
    // };
    if (data) {
      setProducts(data.products);
      // console.log("Main Data");
      // console.log(data);
      setIsLoading(false);
      if (isLoading) {
        console.log(`Loading ...`);
      } else {
        console.log(`Loading Complete`);
      }
    }

    if (isError) {
      console.log(`Getting isError`);
    }
    // fetchData();
  }, [data, isError]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log(`Loading ...`);
      await refetch();
      setIsLoading(false);
      console.log(`Loading Complete`);
    };

    fetchData();
  }, [selectManufacture]);

  // ! search by main types ends here

  // handle manufacturer
  const handleManufacturerChange = (e: any) => {
    setSelectManufacturer(e.target.value); // Update the selectedManufacturer state with the selected option
  };

  // handle search type
  const handleYearChange = (e: any) => {
    setSelectSearchType(e.target.value); // Update the selectedYears state with the selected option
  };
  // handle input search Value
  const handleSetSearchValue = (e: any) => {
    let valueSearch = e.target.value;
    let value = valueSearch;
    setSearchValue(value); // Update the selectedYears state with the selected option
  };

  return (
    <div className="w-full h-auto">
      <div className="pt-5">
        <h2 className="text-center text-[20px] text-yellow-400 mb-3">
          Lets Get What You Need
        </h2>
        <div className="flex justify-center px-6">
          {/* bg */}
          <div className="flex bg-yellow-500 p-1 px-3 gap-2 divide-x divide-black rounded-full ">
            <div className="flex items-center">
              {selectSearchType === "Chassis" ? (
                <>
                  <input
                    type="text"
                    placeholder="S51"
                    className="p-2 outline-none bg-transparent text-white placeholder:text-white w-[13vw] text-[15px]"
                    value={searchValue}
                    onChange={handleSetSearchValue}
                  />
                  <button
                    // onClick={handleChassisSearch}
                    className="pr-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              ) : selectSearchType === "Parts Number" ? (
                <>
                  <input
                    type="text"
                    placeholder="08911-1062G"
                    className="p-2 outline-none bg-transparent text-white placeholder:text-white w-[13vw] text-[15px]"
                    value={searchValue}
                    onChange={handleSetSearchValue}
                  />
                  <button
                    // onClick={handlePartsSearch}
                    className="pr-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="flex items-center ">
              <select
                className="select select-bordered w-full max-w-xs bg-yellow-500"
                value={selectSearchType} // Set the selected value of the select element to the state variable
                onChange={handleYearChange} // Handle the change event
              >
                <option selected>Categories</option>
                <option>Parts Number</option>
                <option>Chassis</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <CarsCards
        selectSearchType={selectSearchType}
        searchValue={searchValue}
        isLoading={isLoading}
        products={products}
        framesProduct={framesProduct}
        partState={partState}
      />
    </div>
  );
}

export default SearchInput;
