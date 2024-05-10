"use client";

import React from "react";
import Image from "next/image";

export interface ProductAdItemProps {
  title: string;
  url: string;
  photoUrl: string;
  shop: string;
  price: number;
}

export const ProductAdItem: React.FC<ProductAdItemProps> = ({
  title,
  url,
  photoUrl,
  shop,
  price,
}) => {
  title = title.length > 23 ? title.slice(0, 23) + "..." : title;
  shop = shop.length > 13 ? shop.slice(0, 13) + "..." : shop;
  return (
    <a href={url}>
      <div className="w-28 h-52 border border-gray-300 rounded-md shadow hover:shadow-lg hover:scale-105 cursor-pointer">
        <Image
          className="object-cover"
          src={photoUrl}
          alt="DealFinder logo"
          width={128}
          height={128}
          priority
        />
        <div className="p-1">
          <h2 className="text-sm leading-4 mb-1 text-dark-blue hover:text-dark-orange hover:underline">
            {title}
          </h2>
          <p className="text-sm mb-1 text-green-900">{shop}</p>
          <p className="text-sm">${price}</p>
        </div>
      </div>
    </a>
  );
};
