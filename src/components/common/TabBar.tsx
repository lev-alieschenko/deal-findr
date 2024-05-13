import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const routes = [
  {
    label: "ALL",
    path: "/",
  },
  {
    label: "IMAGES",
    path: "/images",
  },
  {
    label: "VIDEOS",
    path: "/",
  },
  {
    label: "MAPS",
    path: "/",
  },
  {
    label: "NEWS",
    path: "/",
  },
  {
    label: "MORE",
    path: "/",
  },
  {
    label: "TOOLS",
    path: "/",
  },
];

export const TabBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("ALL");

  const handleTabClick = (label: string, path: string) => {
    setActiveTab(label);
    const query = searchParams.get("query");
    const url = query ? `${path}?query=${query}` : path;
    router.push(url);
  };

  return (
    <nav className="pl-40">
      <ul className="flex flex-row">
        {routes.map((r, index) => {
          const isActive = activeTab === r.label;
          const liClassName = isActive
            ? "mx-3 py-[3px] border-b-[3px] border-blue-800"
            : "mx-3 py-[3px] hover:border-b-[3px] border-gray-400";
          const aClassName = isActive
            ? "px-2 text-xs font-semibold"
            : "px-2 text-xs";
          return (
            <li key={index} className={liClassName}>
              <a
                href="#"
                className={aClassName}
                onClick={() => {
                  setActiveTab(r.label);
                  handleTabClick(r.label, r.path);
                }}
              >
                {r.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
