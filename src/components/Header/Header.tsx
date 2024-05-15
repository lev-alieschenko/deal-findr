"use client";

import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TabBar, setUrlParameter} from "../common";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "../context";

export const Header = () => {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const { query, setQuery } = useAppContext();

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setInputValue(searchQuery);
      setQuery(searchQuery);
    }
  }, []);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUrlParameter("query", inputValue);
    setQuery(inputValue);
    // const res = await fetch(`https://api.search.yahoo.com/sdata/v3/search?appid=rOjuMFbXnnxDFp8KhvbeG0DGzr7yUAQLuG1ReMDk4lq9OgrqjA&query=${searchQuery}&market=en-US&uIP=a3c1864c-5592-497b-85b7-512ac7c18e48&serveUrl=`);
    // console.log(res);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <header>
      <div className="w-100 border-b border-gray-300">
        <div className="flex flex-row items-center md:items-left">
          <div>
            <div className="ml-8 flex flex-row h-20 items-center justify-center">
              <div className="pr-8">
                <a href="/">
                  <Image
                    src="/deal-findr.png"
                    alt="DealFinder logo"
                    width={96}
                    height={40}
                    priority
                  />
                </a>
              </div>
              <form onSubmit={submitHandler}>
                <div className="w-full lg:w-[650px] shadow-md">
                  <Input
                    size="lg"
                    onChange={handleInputChange}
                    value={inputValue}
                    label="Search"
                    icon={<FontAwesomeIcon icon={faSearch} />}
                  />
                </div>
              </form>
            </div>
            {query && <TabBar />}
          </div>
        </div>
      </div>
    </header>
  );
};
