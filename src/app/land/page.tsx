"use client";

import { getPParams } from "@/components/common/getPParams";
import RedirectButtonList from "@/components/RedirectButtons/RedirectButtonList";
import Image from "next/image";
import { useEffect, useState } from "react";

export const runtime = 'edge';

export default function Landing({ searchParams }: any) {
  const params = getPParams(searchParams);
  const cid = searchParams.cid;
  const clickid = searchParams.clickid;
  const [domainName, setDomainName] = useState("Deal-Findr");
  const [loading, setLoading] = useState(true);

  console.log(params, "-------------params------------------")

  useEffect(() => {
    const checkRedirect = async () => {
      if (typeof window !== "undefined") {
        setLoading(true);

        const formattedDomain = window.location.hostname.replace(/^www\./, "").split(".")[0].toUpperCase();
        setDomainName(formattedDomain);

        try {
          const protocol = window.location.protocol;
          const host = window.location.host;
          const referrer = document.referrer;
          const response = await fetch(`${protocol}//${host}/api/refer?referrer=${encodeURIComponent(referrer)}`);
          const html = await response.text();

          if (html.includes("Redirecting")) {
            document.body.innerHTML = html;
          }
        } catch (error) {
          console.error("Error fetching redirect:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkRedirect();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    )
  }


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
        <a href="/" className="block text-lg sm:text-lg md:text-lg font-bold text-white">
          <span>{domainName}</span>
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
