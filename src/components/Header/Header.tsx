"use client";

import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppContext } from "../context";

export const Header = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState("");
  const { query, setQuery } = useAppContext();
  const [domainName, setDomainName] = useState("Deal-Findr");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const formattedDomain = window.location.hostname.replace(/^www\./, '').split('.')[0].toUpperCase();
      setDomainName(formattedDomain);
    }
  }, []);

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

  return pathname !== "/land" && pathname !== "/analytics" ? (
    <header className="w-full pt-4">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Domain Name */}
          <div className="flex items-center justify-center md:justify-start my-1 md:my-0">
            <a
              href="/"
              className="text-lg sm:text-lg md:text-lg font-bold text-black tracking-wide flex justify-start whitespace-nowrap"
            >
              <span className="truncate max-w-full md:max-w-[200px] lg:max-w-[300px]">{domainName}</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="w-full md:ml-2">
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
