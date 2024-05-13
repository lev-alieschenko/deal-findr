"use client";

import { TextAdList } from "../TextAdsList/TextAdList";
import { ProductAdList } from "../ProductAdsList/ProductAdList";

const DUMMY_TEXT_ADs = [
  {
    title: "America’s Car-Mart cat car car car car car car car car carcarca",
    url: "https://www.car-mart.com/",
    description:
      "Stress-Free Used Car Buying — Bad credit doesn’t define you. Drive away today with a low down payment on a great car. njfkdls nfjdks fnjdks nfjd sknf jdks mdkslam dksla; mdksla",
  },
  {
    title: "America’s Car-Mart",
    url: "https://www.car-mart.com/",
    description:
      "Stress-Free Used Car Buying — Bad credit doesn’t define you. Drive away today with a low down payment on a great car.",
  },
  {
    title: "America’s Car-Mart",
    url: "https://www.car-mart.com/",
    description:
      "Stress-Free Used Car Buying — Bad credit doesn’t define you. Drive away today with a low down payment on a great car.",
  },
  {
    title: "America’s Car-Mart",
    url: "https://www.car-mart.com/",
    description:
      "Stress-Free Used Car Buying — Bad credit doesn’t define you. Drive away today with a low down payment on a great car.",
  },
  {
    title: "America’s Car-Mart",
    url: "https://www.car-mart.com/",
    description:
      "Stress-Free Used Car Buying — Bad credit doesn’t define you. Drive away today with a low down payment on a great car.",
  },
];

const DUMMY_PRODUCT_ADs = [
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/car.jpg",
    sellername: "grillshop.com",
    price: 499,
    rating: 10,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/car.jpg",
    sellername: "grillshop.com",
    price: 499,
    rating: 5,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/car.jpg",
    sellername: "grillshop.com",
    price: 499,
    additional: "50% price drop",
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/car.jpg",
    sellername: "grillshop.com",
    price: 499,
    rating: 7,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/car.jpg",
    sellername: "grillshop.com",
    price: 499,
    rating: 0,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/car.jpg",
    sellername: "grillshop.com",
    price: 499,
    additional: "50% price drop",
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/car.jpg",
    sellername: "grillshop.com",
    price: 499,
    additional: "50% price drop",
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/car.jpg",
    sellername: "grillshop.com",
    price: 499,
  },
];

const DUMMY_RELATED_SEARCHES = [
  "buy car buy car buy car buy car buy car buy car buy car buy cae",
  "usa cars for sale",
  "car simulator 2",
  "download car for sale",
  "formula 1",
  "exotic lamborghini car",
  "rent a car",
];

export const SearchResults = () => {
  return (
    <div>
      <div className="pl-5">
        <span className="text-sm text-gray-600 inline-block overflow-hidden whitespace-nowrap">
          About 304 000 000 results
        </span>
      </div>
      <div className="w-full flex flex-row pt-2">
        <TextAdList ads={DUMMY_TEXT_ADs} />
        <div className="min-w-[500px] max-w-[500px] ml-28">
          <ProductAdList
            title="Shops for Portable Barbecue Grill"
            ads={DUMMY_PRODUCT_ADs}
          />
        </div>
      </div>
    </div>
  );
};

