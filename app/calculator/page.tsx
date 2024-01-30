"use client";

import React, { useEffect, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {};

const ShippingCalculator = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  const [countries, setCountries] = useState([]);

  const [weight, setWeight] = useState(0);
  const [boxSize, setBoxSize] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const boxArray = boxSize.split("x");

    console.log(`box ${boxArray}`);
    setLength(boxArray[0]);
    setWidth(boxArray[1]);
    setHeight(boxArray[2]);
  }, [boxSize, length, width, height]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data
          .map((country: any) => country.name.common)
          .sort();
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCalculate = () => {
    if (weight <= 0) {
      setErrorMessage(`Weight Must Be More Than 0kg`);
    } else if (boxSize === "") {
      setErrorMessage(`Please Select Any Box Size`);
    } else if (selectedCountry === "") {
      setErrorMessage(`Please Select Any Country`);
    } else if (zipCode === "") {
      setErrorMessage(`Please Enter The Zip Code`);
    } else if (city === "") {
      setErrorMessage(`Please Enter The City`);
    } else if (streetAddress === "") {
      setErrorMessage(`Please Enter The Street Address`);
    } else {
      setErrorMessage(`All Good ✅`);
    }
  };

  return (
    <div className="w-full min-h-screen h-auto bg-black">
      <Heading
        title="Shipping Calculator Loonia Traders"
        description="Loonia Traders Admin Dashboard"
        keywords="loonia traders, admin, dashboard, carparts"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className="py-6 flex flex-col  items-center md:w-[70%] lg:w-[60%] xl:w-[50%] w-[90%]  mx-auto gap-y-4">
        <h1 className="text-2xl text-yellow-500">Shipping Calculator</h1>
        <p className="text-sm text-center">{`This shipping calculator provides an approximate shipping charges and may contain not all shipping methods available.
Total parcel weight with package is used for calculation.
Package weight will be automatically added during checkout.`}</p>
        {/* <br /> */}
        <p className="text-sm text-center">{`If you did not found shipping method to your location please contact us. Usually, we can provide shipping to almost anywhere.`}</p>

        {/* calculator starts here */}
        <div className="w-full min-h-[300px] h-auto border rounded-md bg-blue-200 flex flex-col justify-start items-center py-6 my-4">
          <p className="text-black mb-4">
            From <b>Japan</b>:{" "}
          </p>

          {/* weight in kgs*/}
          <div className="mb-3 flex flex-col gap-y-2  justify-center items-center">
            <label htmlFor="weight" className="text-black">
              Weight, kgs
            </label>
            <input
              type="number"
              placeholder="3.0"
              value={weight}
              onChange={(e: any) => {
                setWeight(e.target.value);
              }}
              className="input input-bordered input-sm w-auto max-w-xs"
            />
          </div>

          {/* box size */}
          <div className="mb-3 flex flex-col gap-y-2 justify-center items-center">
            <label htmlFor="box" className="text-black">
              Box
            </label>
            <select
              name="box"
              id=""
              value={boxSize}
              onChange={(e: any) => setBoxSize(e.target.value)}
              className="p-2 rounded-md w-full text-sm bg-black bg-opacity-80 border-none focus:border-none"
            >
              <option value="25x20x8">25x20x8</option>
              <option value="23x18x17">23x18x17</option>
              <option value="30x24x22">30x24x22</option>
              <option value="38x29x24">38x29x24</option>
              <option value="30x24x11">30x24x11</option>
              <option value="38x29x13">38x29x13</option>
            </select>
          </div>

          {/* Dimensions, cm	 */}
          <div className="mb-3 flex flex-wrap gap-x-2 justify-center items-center">
            <label htmlFor="dimensions" className="text-black">
              Dimensions, cm
            </label>
            <div className="flex flex-wrap justify-center items-center gap-2 text-black">
              <input
                type="text"
                placeholder="38"
                value={length}
                onChange={(e: any) => {
                  setLength(e.target.value);
                }}
                className="input input-bordered input-sm w-auto max-w-xs text-white"
              />
              <input
                type="text"
                placeholder="29"
                value={width}
                onChange={(e: any) => {
                  setWidth(e.target.value);
                }}
                className="input input-bordered input-sm w-auto max-w-xs text-white"
              />
              <input
                type="text"
                placeholder="11"
                value={height}
                onChange={(e: any) => {
                  setHeight(e.target.value);
                }}
                className="input input-bordered input-sm w-auto max-w-xs text-white"
              />
            </div>
          </div>

          {/* address */}
          <p className="text-black my-4">
            <b>TO</b> :{" "}
          </p>

          {/* country  */}
          <div className="mb-3 flex flex-col gap-y-2 justify-center items-center">
            <label htmlFor="countries" className="text-black">
              Country
            </label>
            <select
              name="countries"
              id=""
              className="p-2 text-sm rounded-md w-[65%] bg-black bg-opacity-80 border-none focus:border-none"
              value={selectedCountry}
              onChange={(e: any) => setSelectedCountry(e.target.value)}
            >
              {countries.map((country: any, index: number) => {
                return (
                  <option value={country} key={index} className="outline-none">
                    {country}
                  </option>
                );
              })}
            </select>
          </div>

          {/* zip code */}
          <div className="mb-3 flex flex-col gap-y-2  justify-center items-center">
            <label htmlFor="zid code" className="text-black">
              Zip Code
            </label>
            <input
              type="number"
              placeholder="47080"
              value={zipCode}
              onChange={(e: any) => setZipCode(e.target.value)}
              className="input input-bordered input-sm w-auto max-w-xs text-white"
            />
          </div>

          {/* city */}
          <div className="mb-3 flex flex-col gap-y-2  justify-center items-center">
            <label htmlFor="city" className="text-black">
              City
            </label>
            <input
              type="text"
              placeholder="city"
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
              className="input input-bordered input-sm w-auto max-w-xs text-white"
            />
          </div>

          {/* street address */}
          <div className="mb-3 flex flex-col gap-y-2  justify-center items-center">
            <label htmlFor="address" className="text-black">
              Street Address
            </label>
            <input
              type="text"
              placeholder="street address"
              value={streetAddress}
              onChange={(e: any) => setStreetAddress(e.target.value)}
              className="input input-bordered input-sm w-auto max-w-xs text-white"
            />
          </div>

          <button
            className="btn btn-md my-4 hover:bg-opacity-85"
            onClick={handleCalculate}
          >
            Calculate
          </button>

          {errorMessage !== "" && errorMessage && (
            <p
              className={
                errorMessage === "All Good ✅"
                  ? "text-green-600 text-sm text-center"
                  : `text-red-600 text-sm text-center`
              }
            >
              {errorMessage}
            </p>
          )}
        </div>

        {/* calculator ends here */}
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default ShippingCalculator;
