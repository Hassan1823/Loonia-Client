"use client";

import { useState } from "react";
import CarsCards from "./CarsCards";

function SearchInput() {
  const [selectManufacture, setSelectManufacturer] = useState("Toyota");
//   const [selectYear, setSelectYear] = useState("");

  // handle manufacturer
  const handleManufacturerChange = (e:any) => {
    setSelectManufacturer(e.target.value); // Update the selectedManufacturer state with the selected option
  };

  // handle years
//   const handleYearChange = (e:any) => {
//     setSelectYear(e.target.value); // Update the selectedYears state with the selected option
//   };

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
            {/* <div className="flex items-center pl-4">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <select
                className="select select-bordered w-full max-w-xs bg-yellow-500"
                value={selectYear} // Set the selected value of the select element to the state variable
                onChange={handleYearChange} // Handle the change event
              >
                <option disabled>Years</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
                <option>2014</option>
                <option>2013</option>
                <option>2012</option>
                <option>2011</option>
                <option>2010</option>
                <option>2009</option>
                <option>2008</option>
                <option>2007</option>
                <option>2006</option>
                <option>2005</option>
                <option>2004</option>
                <option>2003</option>
                <option>2002</option>
                <option>2001</option>
                <option>2000-1966</option>
              </select>
            </div> */}
          </div>
        </div>
      </div>

      <CarsCards
        selectManufacture={selectManufacture}
      //   selectYear={selectYear}
      />
    </div>
  );
}

export default SearchInput;
