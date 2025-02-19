"use client";

import { getPParams } from "@/components/common/getPParams";
import RedirectButtonList from "@/components/RedirectButtons/RedirectButtonList";
import Image from "next/image";

export const runtime = 'edge';

export default function Landing({ searchParams }: any) {
  const params = getPParams(searchParams);
  const cid = searchParams.cid;
  const clickid = searchParams.clickid;

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
      <div className="min-h-screen w-4/5 lg:w-2/5 pt-8 pb-20 sm:pb-12 mx-auto flex flex-col items-end">
        <a href="/" className="block text-xl sm:text-2xl md:text-2xl font-bold text-white">
          <span>Deal-Findr</span>
        </a>
        {params.length > 0 && (
          <p className="text-gray-200 mt-10">Searches</p>
        )}
        {params.length > 0 ? (
          <RedirectButtonList searchParams={params} cid={cid} clickid={clickid} />
        ) : (
          <p className="text-gray-200 text-center mt-10">No searches</p>
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
