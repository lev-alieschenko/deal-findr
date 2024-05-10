"use client"

import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import { useState } from "react";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const res = await fetch(`https://api.search.yahoo.com/sdata/v3/search?appid=rOjuMFbXnnxDFp8KhvbeG0DGzr7yUAQLuG1ReMDk4lq9OgrqjA&query=${searchQuery}&market=en-US&uIP=a3c1864c-5592-497b-85b7-512ac7c18e48&serveUrl=`);
    // console.log(res);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return <header>
    <div className="w-100 border-b border-gray-300">
      <div className="ml-8 flex flex-row items-center md:items-left">
        <div className="flex flex-row h-24 items-center justify-center">
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
              <Input size="lg" onChange={handleInputChange} label="Search" icon={<FontAwesomeIcon icon={faSearch} />} />
            </div>
          </form>
        </div>
      </div>
    </div>
  </header>
};