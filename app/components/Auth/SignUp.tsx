"use client";
import React, { FC, useState } from "react";

// ~ external libraries imports
import { useFormik } from "formik";
import * as Yup from "yup";

//~ icons imports
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

// ~local imports
import { styles } from "../../../app/styles/style";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please Enter Your Name"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      console.log(name, email, password);
      setRoute("Verification");
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Join Loonia Traders</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="name">
          Enter Your Name
        </label>
        <input
          type="text"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="John Wick"
          className={`${errors.name && touched.name && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="email">
            Enter Your Email
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="john@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password@!%&"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-yellow-500"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-yellow-500"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}

        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>

        <br />

        <h5 className="text-center pt-4 text-[14px] text-yellow-500">
          Or Join With
        </h5>

        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>

        <h5 className="text-center pt-4 text-[14px] ">
          Already Have An Account ?
          <span
            className="text-yellow-500 pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign In
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
