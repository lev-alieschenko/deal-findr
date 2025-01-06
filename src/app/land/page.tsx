"use client";

import { getPParams } from "@/components/common/getPParams";
import RedirectButtonList from "@/components/RedirectButtons/RedirectButtonList";
import Image from "next/image";

export default function Landing({ searchParams }: any) {
  const params = getPParams(searchParams);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#0d0d3d] to-[#00d4ff] relative">
      <Image
        src="/curved-wings.png"
        alt="Left Wing"
        className="w-1/4 fixed bottom-0 left-0 hidden lg:block"
        width={320}
        height={320}
        priority
      />
      <div className="min-h-screen w-4/5 lg:w-2/5 mx-auto pt-[30vh]">
        <p className="text-gray-500">Searches</p>
        <RedirectButtonList searchParams={params} />
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
