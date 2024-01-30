"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { IoIosCart } from "react-icons/io";

// ~ local imports
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/dp.jpg";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useUserCartQuery } from "@/redux/features/user/userApi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
  cartLength?: number;
  setCartLength?: (cartLength: number) => void;
};

const Header: FC<Props> = ({
  activeItem,
  setOpen,
  route,
  setRoute,
  open,
  cartLength,
  setCartLength,
}) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();

  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    } else {
      console.log(`----------------------- `);
      console.log(user ? user.products.length : 0);
      console.log(`----------------------- `);
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("🚀 Login Successfully");
      }
    }
    // if (data === null) {
    //   setLogout(true);
    // }
  }, [user, data, isSuccess, socialAuth]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "bg-opacity-50 bg-gradient-to-b from-gray-900 to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b border-[#ffffff1c] h-[80px] z-[80] shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div className="">
              <Link
                href={"/"}
                className="800px:text-4xl text-xl text-yellow-500 font-[500] hover:shadow-sm"
              >
                Loonia Traders
              </Link>
            </div>
            <div className="flex items-center gap-2 ">
              <NavItems activeItem={activeItem} isMobile={false} />

              {/*  for desktop */}
              {user ? (
                <Link href={"/profile"} className="ml-4">
                  <Image
                    src={user.avatar ? user.avatar?.url : avatar}
                    alt="user profile picture"
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    width={30}
                    height={30}
                    style={{
                      border: activeItem === 5 ? "2px solid #ffc107" : "none",
                    }}
                  />
                </Link>
              ) : (
                <div className="flex ">
                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointer text-white"
                    onClick={() => setOpen(true)}
                  />
                </div>
              )}
              <div className="800px:hidden ml-4 ">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-white"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {/* only for desktop */}
              <div className="hidden 800px:flex">
                <Link href={"/cart"} passHref>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle"
                    >
                      <div className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="badge badge-sm indicator-item">
                          {cartLength !== 0 && cartLength
                            ? cartLength
                            : user.products
                            ? user.products.length
                            : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* mobile side bar */}
        {openSidebar && (
          <div
            className="800px:hidden fixed w-full h-screen top-0 left-0 z-[99999] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999999] h-screen bg-slate-900 bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <Link href={`/cart`} passHref>
                <IoIosCart
                  size={25}
                  className="cursor-pointer ml-5 my-2 text-white "
                />
              </Link>
              {/* <br />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-white "
                onClick={() => setOpen(true)}
              /> */}
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-white ">
                Copyright &copy; 2024 Loonia Traders
              </p>
            </div>
          </div>
        )}
      </div>

      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
