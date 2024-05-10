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
    photoUrl: "/grill.png",
    shop: "grillshop.com",
    price: 499,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/grill.png",
    shop: "grillshop.com",
    price: 499,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/grill.png",
    shop: "grillshop.com",
    price: 499,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/grill.png",
    shop: "grillshop.com",
    price: 499,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/grill.png",
    shop: "grillshop.com",
    price: 499,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/grill.png",
    shop: "grillshop.com",
    price: 499,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/grill.png",
    shop: "grillshop.com",
    price: 499,
  },
  {
    title: "Barbecue portable grill",
    url: "https://www.car-mart.com/",
    photoUrl: "/grill.png",
    shop: "grillshop.com",
    price: 499,
  },
];

export const SearchResults = () => {
  return (
    <div className="w-full flex flex-row">
      <div className="min-w-[608px]">
        <TextAdList ads={DUMMY_TEXT_ADs} />
      </div>
      <ProductAdList title="Shops for Portable Barbecue Grill" ads={DUMMY_PRODUCT_ADs} />
    </div>
  );
};
