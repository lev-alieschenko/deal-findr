"use client";

import { getPParams } from "@/components/common/getPParams";
import RedirectButtonList from "@/components/RedirectButtons/RedirectButtonList";
import { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const runtime = 'edge';

export default function Landing({ searchParams }: any) {
  const params = getPParams(searchParams);
  const cid = searchParams.cid;
  const clickid = searchParams.clickid;
  const subid = searchParams.subid;
  const [domainName, setDomainName] = useState("Deal-Findr");
  const [loading, setLoading] = useState(true);

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
          const response = await fetch(`${protocol}//${host}/api/refer?referrer=${encodeURIComponent(referrer)}&query=${params[0]}&cid=${cid}&clickid=${clickid}&subid=${subid}&t=n2s3c`);
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
    <div className="w-full pt-4 bg-[#E6F3FF]">
      <div className="min-h-screen w-4/5 lg:w-2/5 pt-3 pb-20 sm:pb-12 mx-auto flex flex-col items-start">
        <form className="w-full">
          <div className="shadow-md">
            <Input
              size="lg"
              label="Search"
              icon={
                <FontAwesomeIcon
                  className="cursor-pointer hover:text-blue-500 transition-colors"
                  icon={faSearch}
                />
              }
              className="w-full bg-white"
              crossOrigin={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
        </form>
        {params.length > 0 && (
          <>
            <p className="mt-5 text-xs sm:text-sm md:text-base text-gray-600 inline-block overflow-hidden whitespace-nowrap">Search for</p>
          </>
        )}

        {params.length > 0 ? (
          <>
            <RedirectButtonList searchParams={params} cid={cid} clickid={clickid} subid={subid} />
            <div className="w-full flex justify-center my-1 md:my-0">
              <a
                href="/"
                className="text-xl font-bold text-gray-800 tracking-wide whitespace-nowrap"
              >
                <span className="truncate max-w-full text-center">
                  {domainName}
                </span>
              </a>
            </div>

          </>
        ) : (
          <p className="text-gray-400 mt-10 text-left">No searches</p>
        )}
      </div>

    </div>
  );
}
