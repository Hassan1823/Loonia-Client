import React, { FC } from "react";
import avatarDefault from "../../../public/dp.jpg";
import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";


type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "bg-slate-800" : "bg-transparent"
        } duration-500 hover:bg-slate-600`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
          alt={"user dp"}
          width={20}
          height={20}
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden text-white">My Account</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "bg-slate-800" : "bg-transparent"
        } duration-500 hover:bg-slate-600`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden text-white">Change Password</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "bg-slate-800" : "bg-transparent"
        } duration-500 hover:bg-slate-600`}
        onClick={() => setActive(3)}
      >
        <MdOutlineProductionQuantityLimits size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden text-white">Cart Products</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "bg-slate-800" : "bg-transparent"
        } duration-500 hover:bg-slate-600`}
        onClick={()=>logOutHandler()}
      >
        <IoLogOutOutline size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden text-white">Logout</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
