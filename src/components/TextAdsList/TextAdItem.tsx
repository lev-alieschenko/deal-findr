"use client";

import React from "react";
import { trackAdClick } from "@/shared/utils/metaPixel";
import { sendPostback } from "@/shared/utils/postback";
import { useSearchParams } from "next/navigation";

export interface TextAdItemProps {
  title: string;
  url: string;
  description: string;
  iconUrl?: string;
  displayUrl?: string;
  displayDomain?: string;
}

export const TextAdItem: React.FC<TextAdItemProps> = ({
  title,
  url,
  description,
  iconUrl,
  displayDomain,
  displayUrl,
}) => {
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");

  const handleClick = () => {
    if (cid) {
      sendPostback(cid);
    }

    trackAdClick({
      contentType: "text",
      contentName: title,
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateHtml = (html: string, maxLength: number) => {
    const strippedText = stripHtml(html);
    if (strippedText.length <= maxLength) return html;

    let truncated = "";
    let currentLength = 0;
    let inTag = false;
    let currentTag = "";

    for (let i = 0; i < html.length; i++) {
      const char = html[i];

      if (char === "<") {
        inTag = true;
        currentTag = "";
      }

      if (inTag) {
        currentTag += char;
      }

      if (!inTag) {
        currentLength++;
      }

      if (char === ">") {
        inTag = false;
        truncated += currentTag;
        continue;
      }

      if (!inTag) {
        truncated += char;
      }

      if (currentLength >= maxLength && !inTag) {
        truncated += " ...";
        break;
      }
    }

    const matches = truncated.match(/<([^/][^>]*?)>/g) || [];
    const openTags = matches
      .map((tag) => tag.match(/<([^ >]*)/)?.[1] || "")
      .filter(Boolean);

    for (let i = openTags.length - 1; i >= 0; i--) {
      truncated += `</${openTags[i]}>`;
    }

    return truncated;
  };

  const processDescription = (desc: string, maxLength: number) => {
    const allowedTags = ["strong", "em", "b", "i", "span"];

    allowedTags.forEach((tag) => {
      desc = desc.replace(new RegExp(`</${tag}>`, "gi"), `||/${tag}||`);
    });

    allowedTags.forEach((tag) => {
      desc = desc.replace(new RegExp(`<${tag}>`, "gi"), `||${tag}||`);
    });

    desc = desc.replace(/<[^>]+>/g, "");

    if (stripHtml(desc).length > maxLength) {
      let stripped = "";
      let length = 0;
      let parts = desc.split(" ");

      for (let part of parts) {
        if (length + stripHtml(part).length > maxLength) {
          break;
        }
        stripped += (stripped ? " " : "") + part;
        length += stripHtml(part).length;
      }

      desc = stripped + " ...";
    }

    allowedTags.forEach((tag) => {
      desc = desc.replace(new RegExp(`\\|\\|${tag}\\|\\|`, "g"), `<${tag}>`);
      desc = desc.replace(new RegExp(`\\|\\|/${tag}\\|\\|`, "g"), `</${tag}>`);
    });

    return desc;
  };

  const truncatedTitle = truncateHtml(title, 61);
  const processedDescription = processDescription(description, 175);

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="flex items-center space-x-3 mb-2">
        {iconUrl && (
          <div className="mr-2">
            <img src={iconUrl} alt="Icon" width={16} height={16} />
          </div>
        )}
        <div className="text-sm text-gray-600 truncate">
          {displayDomain && <span className="font-medium">{displayDomain}</span>}
          {displayUrl && <span className="ml-1 text-gray-500">{displayUrl}</span>}
        </div>
      </div>
      <h2 className="text-lg font-semibold text-dark-blue hover:text-orange-600 transition duration-200">
        <a
          rel="noopener noreferrer"
          href={url}
          target="_blank"
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: truncatedTitle }}
        />
      </h2>
      <p
        className="mt-2 text-sm text-gray-700 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: processedDescription }}
      />
    </div>
  );
};

export default TextAdItem;
