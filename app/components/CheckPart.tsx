"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const CheckPart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    console.log("form submitted");
    console.log(input);
    console.log(phone);
    console.log(email);
    if (email === "" || input === "" || phone === "") {
      toast.error("Please Fill All The Fields");
    } else {
      setIsLoading(true);
      const data = { detail: input, number: phone, email: email };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sendDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        setIsLoading(false);
        toast.error("Something Went Wrong");
      } else {
        setInput("");
        setEmail("");
        setPhone("");
        toast.success("✨ Details Submitted Successfully");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-auto h-auto fixed bottom-0 right-0 z-[999999999] text-black rounded-full p-3 ">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-white text-black hover:bg-slate-200"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        {isLoading ? "Please Wait ..." : " Click Me To Find Parts"}
      </button>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle text-white"
      >
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg ">Hello!</h3> */}
          <p className="py-4 text-yellow-500 w-full text-center">
            Please tell us what your are looking for and we will send you all
            the details about that part to your WhatsApp !
          </p>
          <textarea
            // type="text"
            placeholder="Enter Part Details"
            className="outline-none focus:outline-none active:outline-none px-3 py-2 bg-white text-black w-full min-h-[20vh] h-auto rounded-lg"
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="tel"
            name=""
            id=""
            placeholder="WhatsApp Number"
            className="outline-none focus:outline-none active:outline-none px-3 py-2 bg-white text-black w-full h-auto rounded-lg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
          />
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            className="outline-none focus:outline-none active:outline-none px-3 py-2 bg-white text-black w-full h-auto rounded-lg my-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
              <button className="btn ml-6" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CheckPart;
