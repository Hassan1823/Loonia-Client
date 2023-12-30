"use client";

import { styles } from "../../../../app/styles/style";
import React, { FC, useState } from "react";

type Props = {
  productInfo: any;
  setProductInfo: (productInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const ProductInformation: FC<Props> = ({
  productInfo,
  setProductInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setProductInfo({ ...productInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setProductInfo({ ...productInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div className="">
          <label htmlFor="">Product Name</label>
          <input
            type="name"
            name=""
            required
            value={productInfo.name}
            onChange={(e: any) =>
              setProductInfo({ ...productInfo, name: e.target.value })
            }
            id="name"
            placeholder="Part Name Here"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="" className={`${styles.label}`}>
            Product Description
          </label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write Some Description Here"
            className={`${styles.input} !h-min !py-2`}
            value={productInfo.description}
            onChange={(e: any) =>
              setProductInfo({ ...productInfo, description: e.target.value })
            }
          ></textarea>
        </div>

        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Product Price
            </label>
            <input
              type="number"
              name=""
              required
              value={productInfo.price}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
              id="price"
              placeholder="99 $"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Estimated Price (Optional)
            </label>
            <input
              type="number"
              name=""
              required
              value={productInfo.estimatedPrice}
              onChange={(e: any) =>
                setProductInfo({
                  ...productInfo,
                  estimatedPrice: e.target.value,
                })
              }
              id="price"
              placeholder="99 $"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <br />
        <div className="">
          <label htmlFor="email" className={`${styles.label}`}>
            Products Tags
          </label>
          <input
            type="text"
            name=""
            required
            value={productInfo.tags}
            onChange={(e: any) =>
              setProductInfo({ ...productInfo, tags: e.target.value })
            }
            id="price"
            placeholder="car parts, parts etc"
            className={`${styles.input}`}
          />
        </div>

        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Product Level
            </label>
            <input
              type="number"
              name=""
              required
              value={productInfo.level}
              onChange={(e: any) =>
                setProductInfo({ ...productInfo, level: e.target.value })
              }
              id="price"
              placeholder="99 $"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Demo Url
            </label>
            <input
              type="number"
              name=""
              required
              value={productInfo.demoUrl}
              onChange={(e: any) =>
                setProductInfo({
                  ...productInfo,
                  demoUrl: e.target.value,
                })
              }
              id="price"
              placeholder="99 $"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />

        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
            value=""
          />
          <label htmlFor="file"
          className={`w-full min-h-[10vh] border-white p3 border flex items-center justify-center ${dragging ? "bg-yellow-500" : "bg-transparent"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          >
            {/* {
                  productInfo.thumbnail
            } */}
          </label>
        </div>
      </form>
    </div>
  );
};

export default ProductInformation;
