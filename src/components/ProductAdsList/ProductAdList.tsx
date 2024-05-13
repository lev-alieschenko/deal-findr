"use client";

import React from "react";
import { ProductAdItem, ProductAdItemProps } from "./ProductAdItem";

export const ProductAdList: React.FC<{
  title: string;
  ads: ProductAdItemProps[];
}> = ({ title, ads }) => {
  return (
    <div className="w-full h-fit pl-2 pt-2 pr-4 pb-4 border-t-2 border-l-2 border-gray-800 border-r border-b border-gray-300">
      <div className="py-1 flex flex-row justify-between">
        <h1 className="leading-8">{title}</h1>
        <p className="text-sm text-gray-400 leading-8">Ads</p>
      </div>
      <ul className="grid grid-cols-4 gap-2">
        {ads.map((ad, index) => (
          <li key={index}>
            <ProductAdItem
              title={ad.title}
              url={ad.url}
              photoUrl={ad.photoUrl}
              sellername={ad.sellername}
              price={ad.price}
              additional={ad.additional}
              rating={ad.rating}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};


