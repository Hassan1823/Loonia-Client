"use client";

import Header from "@/app/components/Header";
import Loader from "@/app/components/Loader";
import Heading from "@/app/utils/Heading";
import dummyImage from "@/public/dummy.webp";
import {
  useAddToCartMutation
} from "@/redux/features/order/orderApi";
import { useGetSingleProductQuery } from "@/redux/features/products/productApi";
import { useUserCartQuery } from "@/redux/features/user/userApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const Page = ({ params }: any) => {
  const [cartLength, setCartLength] = useState(0);

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  const [itemDesc, setItemDesc] = useState([]);
  const [frames, setFrames] = useState("");
  const schema = params;
  const id = schema.id;
  //     console.log(id)
  const item = decodeURIComponent(schema.itemDesc).trim();
  const cartItem = decodeURIComponent(
    schema.addToCart.replaceAll("%20", " ").trim()
  );
  const exploreSlug = decodeURIComponent(
    schema.exploreSlug.replaceAll("%20", " ").trim()
  );
 

  const { isSuccess, isLoading, data } = useGetSingleProductQuery(id);
  useEffect(() => {
    if (isSuccess) {
      setFrames(data.product.Frames);
      data.product.ListOfHrefs.map((list: any, index: number) => {
        const tag =
          list.H1Tag !== undefined ? list.H1Tag.trim() : list.h1Tag.trim();
        if (tag === item) {
          console.log(true);
          const cards = list.cards;
          cards.filter((card: any) => {
            const altTag = card.Alt;
            if (altTag === cartItem) {
              //   console.log(card);
              setItemDesc(card);
            }
          });
        } else {
          console.log(false);
        }
      });
    }
  }, [isSuccess, data, itemDesc, item, cartItem]);

  const {
    data: cartData,
    isLoading: cartLoading,
    isSuccess: cartSuccess,
    refetch: refetchCart,
  } = useUserCartQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (cartSuccess) {
      // refetch();
      console.log(`Cart updated. New length: ${cartData.products.length}`);
      setCartLength(cartData?.products ? cartData.products.length : 0);
    }
  }, [cartData, cartSuccess]);

  // ~------------------
  // ~ add to cart starts here
  const [addToCart, { isSuccess: addToCartSuccess, error: addToCartError }] =
    useAddToCartMutation({});

  useEffect(() => {
    if (addToCartSuccess) {
      refetchCart();
      toast.success(`Added to Cart`);
    }
    if (addToCartError) {
      if ("data" in addToCartError) {
        const errorMessage = addToCartError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [addToCartSuccess, addToCartError, refetchCart]);
  // ~------------------


  const hrefNamesArray = (itemDesc as any).hrefNames
    ? (itemDesc as any).hrefNames
    : "";
  //   console.log(hrefNamesArray);
  const hrefNumbersArray = (itemDesc as any).hrefNumbers
    ? (itemDesc as any).hrefNumbers
    : "";
  //   console.log(hrefNumbersArray);
  const hrefPricesArray = (itemDesc as any).hrefPrices
    ? (itemDesc as any).hrefPrices
    : "";
  //   console.log(hrefPricesArray);

  const combinedArray = [hrefNamesArray, hrefNumbersArray, hrefPricesArray];
  console.log("Combined array is :", combinedArray);

  // Calculate the 20% values before rendering
  const calculateTwentyPercent = (value: any) => {
    const floatValue = parseFloat(value.replace(/,/g, ""));
    if (isNaN(floatValue)) {
      return value; // If not a valid float, return the original value
    } else {
      const twentyPercent = floatValue * 0.2;
      const sumValue = floatValue + twentyPercent;

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(sumValue);
    }
  };

  let pName = "";
  let pPrice = "";
  let pNumber = "";

  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
    // console.log(`Image Error is : ${imageError}`);
  };

  return (
    <>
      <div className="w-full min-h-screen h-auto">
        <Heading
          title={`${cartItem} ${exploreSlug}`}
          description={`This is the ${cartItem} car with the exploreSlug of ${exploreSlug}`}
          keywords={`loonia traders, car parts, parts for ${cartItem}, parts for ${exploreSlug}, ${cartItem} for ${exploreSlug}`}
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
          cartLength={cartLength}
        />
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : data ? (
          <>
            <div className="w-full min-h-screen h-auto">
              <h1 className="text-3xl font-bold text-yellow-500 text-center my-5">
                Choose Your favourite Part
              </h1>
              <div className="w-full h-auto flex flex-wrap justify-evenly items-center p-4 gap-4">
                <div className="flex flex-col gap-1 w-1/2">
                  <h1 className="text-2xl font-bold text-yellow-500">
                    Details :
                  </h1>
                  <h1>{exploreSlug}</h1>
                  <h1>{frames}</h1>
                  <h1>{item}</h1>
                  <h1 className="text-yellow-500">{cartItem}</h1>
                </div>
                <div className="">
                  <div className="w-full h-auto flex justify-center items-center my-5">
                    <Image
                      src={
                        imageError ? dummyImage : (itemDesc as any).ImageLink
                      }
                      alt={(itemDesc as any).Alt}
                      width={300}
                      height={100}
                      onError={handleImageError}
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* table starts here  */}

              <div className="overflow-x-auto border p-4 rounded-lg mt-10">
                {combinedArray[0] ? (
                  <table className="table">
                    <thead>
                      <tr className="w-1/5 px-4 py-2 text-center">
                        <th>ID</th>
                        <th>Names</th>
                        <th>Numbers</th>
                        <th>Prices</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {combinedArray[0].map((_: any, index: number) => {
                        return (
                          <tr
                            key={index}
                            className={
                              combinedArray[2][index] === "Not available" ||
                              combinedArray[2][index] === "Out of stock" ||
                              combinedArray[2][index] === "Discontinued" ||
                              combinedArray[0][index] === "-"
                                ? "cursor-not-allowed w-1/5 px-4 py-2 text-center bg-slate-700 hover:scale-[103%] duration-200"
                                : "hover hover:duration-300 cursor-pointer w-1/5 px-4 py-2 text-center hover:scale-[103%] duration-200"
                            }
                          >
                            <th>{index + 1}</th>

                            {combinedArray.map((row, rowIndex) => {
                              if (rowIndex === 0) {
                                pName = row[rowIndex];
                              }
                              if (rowIndex === 1) {
                                pNumber = row[rowIndex];
                              }
                              if (rowIndex === 2) {
                                pPrice = calculateTwentyPercent(row[index]);
                              }

                              return (
                                <td key={rowIndex}>
                                  {rowIndex === 2 &&
                                  combinedArray[2][index] !== "Discontinued" &&
                                  combinedArray[2][index] !== "Not available" &&
                                  combinedArray[2][index] !== "Out of stock"
                                    ? // Use the function to calculate and format the values
                                      calculateTwentyPercent(row[index])
                                    : // If the conditions aren't met, display the original value
                                      row[index]}
                                </td>
                              );
                            })}

                            <td>
                              {combinedArray[2][index] !== "Discontinued" &&
                                combinedArray[2][index] !== "Not available" &&
                                combinedArray[2][index] !== "Out of stock" &&
                                combinedArray[0][index] !== "-" && (
                                  <button
                                    className="bg-yellow-500 text-white rounded-md p-2 hover:scale-110 hover:duration-200 "
                                    onClick={() =>
                                      addToCart({
                                        productId: id,
                                        hrefNumbers: combinedArray[0][index],
                                        hrefNames: combinedArray[1][index],
                                        hrefPrices: calculateTwentyPercent(
                                          combinedArray[2][index]
                                        ),
                                      })
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                      />
                                    </svg>
                                  </button>
                                )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <>
                    <h1 className="text-center">
                      No Parts Available for this Category
                    </h1>
                  </>
                )}
              </div>

              {/* table ends here  */}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center">
              No Parts Available for this Category
            </h1>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
