import React from "react";
import { useAppContext } from "../context";
import { setUrlParameter } from "../common";
import { RelatedSearchBar } from "./RelatedSearchBar";

export const RelatedSearchBarList: React.FC<{ queries: string[] }> = ({
  queries,
}) => {
  const { query, setQuery } = useAppContext();

  return (
    <div className="w-full pt-4">
      <div className="pb-5 px-5">
        <h2 className="text-xl">Related searches</h2>
      </div>
      <div>
        <ul className="grid grid-cols-2 gap-2">
          {queries.map((q, index) => (
            <li
              key={index}
              className="rounded-full bg-gray-100 px-4"
            >
              <RelatedSearchBar query={q} cb={() => {
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