import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        className="w-full h-fit sm:h-28 md:h-32 px-4 py-8 text-2xl underline font-bold text-left text-black bg-white border-2 border-cyan-500 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 flex justify-between items-center"
      >
        <span>{text}</span>
        <Image
          className="object-cover"
          src="/next-page.png"
          alt="Next page"
          width={18}
          height={18}
        />
      </button>
    </div>
  );
}
