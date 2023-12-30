"use client";

import React, { useState } from "react";
import ProductInformation from "./ProductInformation";
import ProductOptions from "./ProductOptions";

type Props = {};

const CreateProduct = (props: Props) => {
  const [active, setActive] = useState(0);
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [productContentData, setProductContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [productData, setProductData] = useState({});

  return (
    <div className="w-full flex min-h-screen bg-slate-950">
      <div className="w-[80%]">
        {active === 0 && (
          <ProductInformation
            productInfo={productInfo}
            setProductInfo={setProductInfo}
            active={active}
            setActive={setActive}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[1] top-18 right-0">
        <ProductOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateProduct;
