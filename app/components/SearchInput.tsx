"use client";

import { useGetMainTypeProductsQuery } from "@/redux/features/products/productApi";
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
  const [products, setProducts] = useState([]);

  const [framesProduct, setFramesProduct] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [chassisValue, setChassisValue] = useState("");

  const [prev, setPrev] = useState(1);
  const [current, setCurrent] = useState(10);
  const [totalLength, setTotalLength] = useState<number>(0);

  const [partsValue, setPartsValue] = useState("");
  const [partState, setPartState] = useState<PartsType>(partsInitialState);
  const [partsData, setPartsData] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // ! search by parts number starts here

  const handlePartsSearch = async () => {
    if (partsValue === "") {
      return;
    } else {
      console.log("Parts Values is : ", partsValue);
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const apiUrl = `${baseUrl}/products-by-hrefNumber/${partsValue}/${10}/${1}`;
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPartsData(data.product[0]);
        // console.log("parts Data us ");
        // console.log(partsData);

        setPartState({
          ...partState,
          partName: data.product[0].partName,
          frames: data.product[0].frame,
          h1Tag: data.product[0].mainTitle,
          image: data.product[0].productImage,
          partNumber: data.product[0].partNumber,
          partPrice: data.product[0].partPrice,
          productId: data.product[0].productId,
          subcategory: data.product[0].car,
          title: data.product[0].title,
        });

        // console.log("Parts Data is :");
        // console.table(partState);

        setIsLoading(false);
      } catch (error) {
        return;
      }
    }
  };

  // ! search by parts number ends here

  // ~----------------------------------

  // ! search chassis starts here

  const handleChassisSearch = async () => {
    if (chassisValue === "") {
      return;
    } else {
      console.log(chassisValue);
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const apiUrl = `${baseUrl}/products-by-frames/${chassisValue}/${10}/${1}`;

      try {
        setIsLoading(true);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.products);
        setFramesProduct(data.products);
        setIsLoading(false);
      } catch (error) {
        return;
      }
    }
  };

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
      limit: limit,
      page: page,
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
      setTotalLength(data.totalLength);
      console.log("Length is ", data.totalLength);

      setIsLoading(false);
    }

    if (isError) {
      console.log(`Getting isError`);
    }
  }, [data, isError]);

  // ! search by main types ends here

  // handle manufacturer
  const handleManufacturerChange = (e: any) => {
    setSelectManufacturer(e.target.value);
    handleMainRefetch(); // Update the selectedManufacturer state with the selected option
  };

  const handleMainRefetch = () => {
    setIsLoading(true);
    setLimit(10);
    setPage(1);
    console.log(`handling refetch ${page} and ${limit}`);
    // refetch();
  };

  // handle search type
  const handleYearChange = (e: any) => {
    setSelectSearchType(e.target.value); // Update the selectedYears state with the selected option
  };

  // ! handle load more function
  const handleLoadMore = () => {
    setIsLoading(true);
    console.log(`Loading Prev `);
    const pre = page + 1;
    setPage(pre);
    console.log(`prev :`, page);
    const curr = limit + 10;
    setLimit(curr);
    console.log(`current :`, limit);

    // refetch();
  };
  // ! handle load prev function
  const handleLoadPrev = () => {
    setIsLoading(true);
    console.log(`Loading Prev `);
    const pre = page - 1;
    setPage(pre);
    console.log(`prev :`, page);
    const curr = limit - 10;
    setLimit(curr);
    console.log(`current :`, limit);

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
                    value={chassisValue}
                    onChange={(e) => setChassisValue(e.target.value)}
                  />
                  <button onClick={handleChassisSearch} className="pr-4">
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
                    value={partsValue}
                    onChange={(e) => setPartsValue(e.target.value)}
                  />
                  <button onClick={handlePartsSearch} className="pr-4">
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
        isLoading={isLoading}
        products={products}
        framesProduct={framesProduct}
        partState={partState}
        productsLength={totalLength}
        handleLoadMore={handleLoadMore}
        handleLoadPrev={handleLoadPrev}
        prev={page}
        current={limit}
      />
    </div>
  );
}

export default SearchInput;
