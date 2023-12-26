"use client";
import React, { FC, useRef, useState } from "react";

// ~ other libraries imports
import { toast } from "react-hot-toast";

// ~ icons imports
import { VscWorkspaceTrusted } from "react-icons/vsc";

// ~ local imports
import { styles } from "../../../app/styles/style";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    console.log("test verification handler");
    setInvalidError(true);
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-yellow-500 flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>

      <br />
      <br />

      <div className="1100px:w-[80%] m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-white justify-center text-[18px] outline-none text-center  ${
              invalidError ? "shake border-red-500" : "border-yellow-500"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>

      <br />
      <br />

      <div className="w-full flex justify-center">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>
      <br />

      <h5 className="text-center pt-4 text-[14px] text-white">
        Go Back To Sign In{" "}
        <span
          className="text-yellow-500 pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
};

export default Verification;
