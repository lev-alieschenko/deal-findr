import React from "react";
import Image from "next/image";

export interface RelatedSearchItemProps {
  query: string;
  cb: () => void;
}

export const RelatedSearchItem: React.FC<RelatedSearchItemProps> = ({
  query,
  cb,
}) => {
  query = query.length > 62 ? query.slice(0, 62) + "..." : query;
  return (
    <div
      className="flex flex-row -mx-5 px-5 py-3 cursor-pointer hover:bg-gray-100"
      onClick={cb}
    >
      <div className="mr-3 flex items-center justify-center">
        <Image
          className="object-cover"
          src="/search.png"
          alt="DealFinder logo"
          width={12}
          height={12}
        />
      </div>
      <p className="text-sm">{query}</p>
    </div>
  );
};
