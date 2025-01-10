"use client";

import { getPParams } from "@/components/common/getPParams";
import RedirectButtonList from "@/components/RedirectButtons/RedirectButtonList";
import Image from "next/image";

export const runtime = 'edge';

export default function Landing({ searchParams }: any) {
  const params = getPParams(searchParams);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Image
        src="/curved-wings.png"
        alt="Left Wing"
        className="w-1/4 fixed bottom-0 left-0 hidden lg:block"
        width={320}
        height={320}
        priority
      />
      <div className="min-h-screen w-4/5 lg:w-2/5 mx-auto pt-4 sm:pt-[30vh]">
        {params.length > 0 && <p>Searches</p>}
        {params.length > 0 ? (
          <RedirectButtonList searchParams={params} />
        ) : (
          <p className="text-gray-500 text-center">No searches</p>
        )}
      </div>
      <Image
        src="/curved-wings.png"
        alt="Right Wing"
        className="w-1/4 fixed bottom-0 right-0 transform scale-x-[-1] hidden lg:block"
        width={320}
        height={320}
        priority
      />
    </div>
  );
}
