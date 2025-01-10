import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RedirectButton({ text }: { text: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/?query=${encodeURIComponent(text)}`);
  };

  return (
    <div className="w-full flex justify-center items-center my-4 shadow-md hover:shadow-lg rounded-lg">
      <button
        onClick={handleClick}
        className="w-full h-fit sm:h-28 md:h-32 px-4 py-8 text-2xl underline font-bold text-left text-black bg-white border-2 border-cyan-500 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 flex justify-between items-center"
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
