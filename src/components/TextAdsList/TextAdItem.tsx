"use client";

import React from "react";

export interface TextAdItemProps {
  title: string;
  url: string;
  description: string;
}

export const TextAdItem: React.FC<TextAdItemProps> = ({
  title,
  url,
  description,
}) => {
  title = title.length > 61 ? title.slice(0, 62) + " ..." : title;
  description =
    description.length > 175 ? description.slice(0, 176) + " ..." : description;
  return (
    <div className="w-full mb-4">
      <h2>
        <a
          className="text-xl text-dark-blue hover:text-dark-orange hover:underline"
          href={url}
        >
          {title}
        </a>
      </h2>
      <p className="text-sm text-green-900">{url}</p>
      <p className="text-sm text-gray-800">{description}</p>
    </div>
  );
};
