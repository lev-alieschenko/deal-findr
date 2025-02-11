/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { StarRating } from "../ui";
import { useSearchParams } from "next/navigation";
import { trackAdClick } from "@/shared/utils/metaPixel";
import { sendPostback } from "@/shared/utils/postback";

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
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");

  const handleClick = async (e: React.MouseEvent) => {
    if (cid) {
      sendPostback(cid);
    }

    trackAdClick({
      contentType: "product",
      contentName: title,
      value: price,
    });
  };

  const truncateText = (
    text: string,
    mobileLength: number,
    desktopLength: number
  ) => {
    if (text.length > desktopLength) {
      return `${text.slice(0, desktopLength)}...`;
    }
    return text;
  };

  const truncatedTitle = truncateText(title, 20, 23);
  const truncatedSeller = truncateText(sellername, 10, 13);
  const truncatedAdditional = additional
    ? truncateText(additional, 12, 14)
    : additional;

  const rateStars =
    !rating || rating < 0.5 ? <></> : <StarRating rating={rating} />;

  return (
    <a
      href={url}
      className="block w-full py-4"
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="w-full sm:w-32 h-fit transition-all duration-300
                    border border-gray-300 rounded-lg
                    shadow hover:shadow-lg hover:scale-105
                    cursor-pointer bg-white"
      >
        <div className="relative w-full pt-[90%] sm:pt-[100%] overflow-hidden">
          <img
            className="absolute top-0 left-0 w-full h-full object-contain p-2"
            src={photoUrl}
            alt={truncatedTitle}
          />
        </div>

        <div className="p-4 sm:p-3">
          <h2
            className="text-sm font-medium leading-tight mb-1
                        text-dark-blue hover:text-dark-orange hover:underline
                        line-clamp-2"
          >
            {truncatedTitle}
          </h2>

          <p className="text-sm mb-1 text-green-900 truncate">
            {truncatedSeller}
          </p>

          <p className="text-sm font-medium mb-1">${price.toFixed(2)}</p>

          {truncatedAdditional && (
            <p className="text-xs leading-tight text-gray-800 mb-2 line-clamp-2">
              {truncatedAdditional}
            </p>
          )}

          <div className="flex items-center space-x-1 mt-2">{rateStars}</div>
        </div>
      </div>
    </a>
  );
};
