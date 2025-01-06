"use client";

import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppContext } from "../context";

export const Header = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState("");
  const { query, setQuery } = useAppContext();

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setInputValue(searchQuery);
      setQuery(searchQuery);
    }
  }, [searchParams, setQuery]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("query", inputValue);
      // currentParams.set('ua', window.navigator.userAgent);

      router.push(`/?${currentParams.toString()}`);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return pathname !== "/land" ? (
    <header className="w-full pt-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex justify-center md:justify-start py-4 md:py-0">
            <a href="/" className="block">
              <Image
                src="/deal-findr.png"
                alt="DealFinder logo"
                width={96}
                height={40}
                priority
                className="w-auto h-auto"
              />
            </a>
          </div>
          <div className="w-full md:ml-8 pb-4 md:pb-0">
            <form onSubmit={submitHandler} className="w-full">
              <div className="w-full md:max-w-[650px] shadow-md">
                <Input
                  size="lg"
                  onChange={handleInputChange}
                  value={inputValue}
                  label="Search"
                  icon={
                    <FontAwesomeIcon
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                      icon={faSearch}
                      onClick={handleSearch}
                    />
                  }
                  className="w-full"
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </header>
  ) : null;
};
