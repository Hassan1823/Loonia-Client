import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const ProductOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Product Information",
    "Product Options",
    "Product Content",
    "Product Preview",
  ];
  return (
    <div>
      {options.map((option: any, index: number) => (
        <div className={`w-full flex py-5`} key={index}>
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-yellow-500" : "bg-[#384766]"
            } relative`}
          >
            <IoMdCheckmark className="text-[25px]" />
            {index !== options.length -1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-yellow-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5
            className={`pl-3 ${
              active === index ? "text-white" : "text-white"
            } text-[20px]`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
