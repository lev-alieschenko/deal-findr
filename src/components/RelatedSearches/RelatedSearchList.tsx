import React from "react";
import { RelatedSearchItem } from "./RelatedSearchItem";
import { useAppContext } from "../context";
import { setUrlParameter } from "../common";

export const RelatedSearchList: React.FC<{ queries: string[] }> = ({
  queries,
}) => {
  const { query, setQuery } = useAppContext();

  return (
    <div className="w-full pt-4 border border-gray-300 rounded-md text-gray-800">
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
              <RelatedSearchItem query={q} cb={() => {
                setUrlParameter("query", q);
                setQuery(q);
              }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
