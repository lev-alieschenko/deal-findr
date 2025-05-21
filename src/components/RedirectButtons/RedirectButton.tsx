import React from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function RedirectButton({
  text,
  isFirst = false,
  cid,
  clickid,
  subid,
}: {
  text: string;
  isFirst?: boolean;
  cid: string;
  clickid: string;
  subid: string;
}) {
  const router = useRouter();

  const getDeviceSuffix = () => {
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent.toLowerCase();
      console.log(`Detected User-Agent: ${userAgent}`);
      if (/iphone/.test(userAgent)) return "_i";
      if (/android/.test(userAgent)) return "_a";
    }
    return "";
  };

  const handleClick = () => {
    // Format the keyword with underscores and prefix it
    const formattedSubid = subid.replace(/\s+/g, "_");
    const formattedKeyword = text.replace(/\s+/g, "_");
    const subidValue = `${formattedSubid}_${formattedKeyword}${getDeviceSuffix()}`;

    // Construct URL with all parameters
    const url = `/?query=${encodeURIComponent(text)}${cid ? `&cid=${encodeURIComponent(cid)}` : ''}${clickid ? `&clickid=${encodeURIComponent(clickid)}` : ''}${subidValue ? `&subid=${encodeURIComponent(subidValue)}` : ''}&t=n2s3c`;

    router.push(url);
  };

  return (
    <div className={'w-full flex justify-center items-center my-4'}>
      <button
        onClick={handleClick}
        className='w-full h-10 sm:h-14 md:h-16 px-4 py-4 text-base sm:text-lg md:text-xl font-bold text-left text-gray-800 bg-white rounded-lg shadow-md flex justify-between items-center'
      >
        <span>{text}</span>
        <ChevronRightIcon className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
