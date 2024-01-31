"use client";

import {
  // useGetAllProductsQuery,
  useGetMainTypeProductsQuery,
  useGetProductsByChassisQuery,
  useGetProductsByPartNumberQuery,
} from "@/redux/features/products/productApi";
import { useEffect, useState } from "react";
import CarsCards from "./CarsCards";
import toast from "react-hot-toast";

type PartsType = {
  partName: string;
  partPrice: string;
  partNumber: string;
  image: string;
  frames: string;
  h1Tag: string;
  subcategory: string;
  title: string;
  productId: string;
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
  productId: "",
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
  const [chassisValue, setChassisValue] = useState(searchValue);

  const [prev, setPrev] = useState(0);
  const [current, setCurrent] = useState(10);
  const [totalLength, setTotalLength] = useState<number>(0);

  const [partState, setPartState] = useState<PartsType>(partsInitialState);

  // ! search by parts number starts here

  const {
    data: partsData,
    isError: partsError,
    refetch: partsRefetch,
  } = useGetProductsByPartNumberQuery({ href_number: searchValue });

  useEffect(() => {
    if (selectSearchType === "Parts Number" && searchValue !== "") {
      if (partsData) {
        setIsLoading(false);
        // setPartsProduct(partsData.resultProducts);
        console.log(`Parts Products are:`);

        setPartState({
          ...partState,
          partName: partsData.resultProducts.partName,
          frames: partsData.resultProducts.partName,
          h1Tag: partsData.resultProducts.productName,
          image: partsData.resultProducts.productImage,
          partNumber: partsData.resultProducts.partNumber,
          partPrice: partsData.resultProducts.partPrice,
          subcategory: partsData.resultProducts.mainTitle,
          title: partsData.resultProducts.mainCategory,
          productId: partsData.resultProducts.productId,
        });
        console.log(partState);
      } else {
        setIsLoading(true);
      }
      if (partsError) {
        console.log(`Getting Error in Parts Search`);
      }
    }
  }, [
    partsData,
    partsError,
    // selectSearchType,
    // partState,
  ]);

  useEffect(() => {
    const handlePartsRefetch = async () => {
      setIsLoading(true);
      console.log(`Refetching parts ...`);
      await partsRefetch();
      setIsLoading(false);
      console.log(`Refetching parts Complete`);
    };

    if (partState.partName !== "" && selectSearchType === "Parts Number") {
      setPartState({
        ...partState,
        partName: "",
        frames: "",
        h1Tag: "",
        image: "",
        partNumber: "",
        partPrice: "",
        subcategory: "",
        title: "",
        productId: "",
      });

      handlePartsRefetch();
    }
  }, [searchValue]);

  // ! search by parts number ends here

  // ~----------------------------------

  // ! search chassis starts here

  const chassisResult = useGetProductsByChassisQuery({
    frames: chassisValue,
  });
  const {
    data: chassisData,
    isError: chassisError,
    refetch: chassisRefetch,
  } = chassisResult;

  // console.log(`Search Input Value is :`);
  // console.log(searchValue);

  useEffect(() => {
    setChassisValue(searchValue);

    const inputArray = chassisValue.split("");
    console.log(`input array is`);
    console.log(inputArray);

    setFramesProduct([]);
    if (selectSearchType === "Chassis" && inputArray.length >= 3) {
      if (inputArray.length === 0) {
        toast.error("Please Enter Some Value ...");
      }
      console.log(`hitting chassis api`);
      if (chassisData) {
        setFramesProduct(chassisData.resultProduct);
        console.log("Chassis data:");
        console.log(chassisData);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      if (chassisError) {
        console.log(`Chassis Search Error`);
      }
    }
  }, [chassisData, chassisError, selectSearchType, searchValue, chassisValue]);

  useEffect(() => {
    const refetchChassis = async () => {
      setIsLoading(true);
      console.log(`Refetching Chassis ...`);
      await chassisRefetch();
      setIsLoading(false);
      console.log(`Refetching Chassis Complete`);
    };

    if (selectSearchType === "Chassis") {
      if (framesProduct.length !== 0) {
        // setChassisValue("");
        refetchChassis();
      }
    }
  }, [chassisValue]);

  // ! search chassis ends here

  // ~-------------------------------
  // ! search by main types starts here
  const {
    data,
    isLoading: mainLoading,
    isError,
    refetch,
  } = useGetMainTypeProductsQuery(
    {
      type: selectManufacture,
      prevLimit: prev,
      limit: current,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (mainLoading) {
      console.log(`Loading ...`);
      setIsLoading(true);
    } else {
      console.log(`Loading Complete`);
    }
    if (data) {
      setProducts(data.products);
      setTotalLength(data.length);
      console.log("Length is ", totalLength);

      setIsLoading(false);
    }

    if (isError) {
      console.log(`Getting isError`);
    }
  }, [data, isError]);

  // useEffect(() => {

  //   // const fetchData = async () => {
  //   // setIsLoading(true);
  //   // console.log(`Loading ...`);
  //   // setIsLoading(false);
  //   // console.log(`Loading Complete`);
  //   // };

  //   // fetchData();
  // }, [selectManufacture, current, prev, refetch]);

  // ! search by main types ends here

  // handle manufacturer
  const handleManufacturerChange = (e: any) => {
    setSelectManufacturer(e.target.value);
    handleMainRefetch(); // Update the selectedManufacturer state with the selected option
  };

  const handleMainRefetch = () => {
    setIsLoading(true);
    setPrev(0);
    setCurrent(10);
    console.log(`handling refetch ${prev} and ${current}`);
    // refetch();
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

  // ! handle load more function
  const handleLoadMore = () => {
    setIsLoading(true);
    console.log(`Loading More `);
    setPrev(current);
    console.log(`prev :`, prev);
    const curr = current + 10;
    setCurrent(curr);
    console.log(`current :`, current);

    // refetch();
  };
  // ! handle load prev function
  const handleLoadPrev = () => {
    setIsLoading(true);
    console.log(`Loading Prev `);
    const pre = prev - 10;
    console.log(`prev :`, pre);
    setPrev(pre);
    const curr = current - 10;
    setCurrent(curr);
    console.log(`current :`, current);

    // refetch();
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
                    className="p-2 outline-none bg-transparent text-white placeholder:text-white w-full max-w-xs text-base"
                    value={searchValue}
                    onChange={handleSetSearchValue}
                  />
                  <button
                    //  onClick={handleChassisSearch}
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
              ) : selectSearchType === "Parts" ? (
                <>
                  <input
                    type="text"
                    placeholder="08911-1062G"
                    className="sm:p-0 p-2 outline-none bg-transparent text-white placeholder:text-white w-full max-w-xs text-[15px]"
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
                    className="select w-full max-w-xs bg-yellow-500"
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
                className="select w-full max-w-xs bg-yellow-500"
                value={selectSearchType} // Set the selected value of the select element to the state variable
                onChange={handleYearChange} // Handle the change event
              >
                <option selected>Categories</option>
                <option>Parts</option>
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
        productsLength={totalLength}
        handleLoadMore={handleLoadMore}
        handleLoadPrev={handleLoadPrev}
        prev={prev}
        current={current}
      />
    </div>
  );
}

export default SearchInput;
