import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Products",
    url: "/products",
  },
  {
    name: "About",
    url: "/",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex gap-8">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index ? "text-yellow-500" : "text-white "
                }`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="flex 800px:hidden mt-5 ">
          <div className="w-full text-start py-6">
            <div className="w-full text-center py-6">
              <Link href={"/"} passHref>
                <span className="text-[25px] font-[500] text-white">
                  Loonia Traders
                </span>
              </Link>
            </div>
            {/* <div className="800px:hidden mt-5 gap-8"> */}
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href="/" key={index} passHref>
                  <span
                    className={`${
                      activeItem === index ? "text-yellow-500 " : "text-white "
                    } block py-5 text-[18px] px-6 font-[400]`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;