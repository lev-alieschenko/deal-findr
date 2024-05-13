import React from "react";
import { RelatedSearchItem } from "./RelatedSearchItem";

export const RelatedSearchList: React.FC<{ queries: string[] }> = ({
  queries,
}) => {
  const relatedSearchClickHandler = () => {};

  return (
    <div className="w-full mt-4 pt-4 border border-gray-300 rounded-md text-gray-800">
      <div className="px-5 border-b border-gray-300 pb-[10px]">
        <h2 className="text-xl">Related searches</h2>
      </div>
      <div className="px-5">
        <ul>
          {queries.map((q, index) => (
            <li
              key={index}
              className={`border-gray-300 ${
                index === queries.length - 1 ? "" : "border-b"
              }`}
            >
              <RelatedSearchItem query={q} cb={relatedSearchClickHandler} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
