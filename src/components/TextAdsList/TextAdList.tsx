"use client";

import React from 'react';
import { TextAdItem, TextAdItemProps } from "./TextAdItem";

export const TextAdList: React.FC<{ ads: TextAdItemProps[] }> = ({ ads }) => {
  return (
    <div className="w-[608px]">
      <ul>
        {ads.map((ad, index) => (
          <li key={index}>
            <TextAdItem title={ad.title} url={ad.url} description={ad.description} />
          </li>
        ))}
      </ul>
    </div>
  );
};