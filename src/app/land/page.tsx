"use client";

import { getPParams } from "@/components/common/getPParams";
import RedirectButtonList from "@/components/RedirectButtons/RedirectButtonList";
import Image from "next/image";

export const runtime = 'edge';

export default function Landing({ searchParams }: any) {
  const params = getPParams(searchParams);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#0d0d3d] to-[#00d4ff] relative">
      <Image
        src="/curved-wings.png"
        alt="Left Wing"
        className="w-1/4 fixed bottom-16 left-0 hidden lg:block"
        width={320}
        height={320}
        priority
      />
      <div className="min-h-screen w-4/5 lg:w-2/5 pt-2 pb-20 sm:pb-12 mx-auto flex flex-col items-end">
        <a href="/" className="block">
          <Image
            src="/deal-findr.png"
            alt="DealFinder logo"
            width={96}
            height={40}
            priority
          />
        </a>
        {params.length > 0 && (
          <p className="text-gray-200 mt-4 sm:mt-[30vh]">Searches</p>
        )}
        {params.length > 0 ? (
          <RedirectButtonList searchParams={params} />
        ) : (
          <p className="text-gray-500 text-center">No searches</p>
        )}
      </div>
      <Image
        src="/curved-wings.png"
        alt="Right Wing"
        className="w-1/4 fixed bottom-16 right-0 transform scale-x-[-1] hidden lg:block"
        width={320}
        height={320}
        priority
      />
    </div>
  );
}
