"use client";

import React from "react";
import Image from "next/image";
import { StarRating } from "../ui/StarRating";

export interface ProductAdItemProps {
  title: string;
  url: string;
  photoUrl: string;
  sellername: string;
  price: number;
  additional?: string;
  rating?: number;
}

export const ProductAdItem: React.FC<ProductAdItemProps> = ({
  title,
  url,
  photoUrl,
  sellername,
  price,
  additional,
  rating,
}) => {
  title = title.length > 23 ? title.slice(0, 23) + "..." : title;
  sellername =
    sellername.length > 13 ? sellername.slice(0, 13) + "..." : sellername;
  additional =
    additional && additional.length > 14
      ? additional?.slice(0, 14) + "..."
      : additional;
  const rateStars =
    !rating || rating < 0.5 ? <></> : <StarRating rating={rating} />;

  return (
    <a href={url}>
      <div className="w-28 h-56 border border-gray-300 rounded-md shadow hover:shadow-lg hover:scale-105 cursor-pointer">
        <div className="min-h-[100px] max-w-[112px] flex items-center justify-center">
          <Image
            className="object-cover"
            src={photoUrl}
            alt="DealFinder logo"
            width={112}
            height={100}
            priority
          />
        </div>
        <div className="p-1">
          <h2 className="text-sm leading-4 mb-1 text-dark-blue hover:text-dark-orange hover:underline">
            {title}
          </h2>
          <p className="text-sm mb-1 text-green-900">{sellername}</p>
          <p className="text-sm mb-1">${price}</p>
          {additional && (
            <p className="text-xs leading-5 text-gray-800">{additional}</p>
          )}
          {rateStars}
        </div>
      </div>
    </a>
  );
};

