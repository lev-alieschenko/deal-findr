'use client';
import React from 'react';
import Image from 'next/image';

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
  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateHtml = (html: string, maxLength: number) => {
    const strippedText = stripHtml(html);
    if (strippedText.length <= maxLength) return html;

    let truncated = '';
    let currentLength = 0;
    let inTag = false;

    for (let i = 0; i < html.length; i++) {
      const char = html[i];

      if (char === '<') inTag = true;
      if (!inTag) currentLength++;
      if (char === '>') inTag = false;

      truncated += char;

      if (currentLength >= maxLength && !inTag) {
        truncated += ' ...';
        break;
      }
    }

    const matches = truncated.match(/<([^/][^>]*?)>/g) || [];
    const openTags = matches.map((tag) => tag.replace(/<([^ >]*)[^>]*>/, '$1'));

    for (let i = openTags.length - 1; i >= 0; i--) {
      if (!truncated.includes(`</${openTags[i]}`)) {
        truncated += `</${openTags[i]}>`;
      }
    }

    return truncated;
  };

  const truncatedTitle = truncateHtml(title, 61);
  const truncatedDescription =
    description.length > 175 ? description.slice(0, 176) + ' ...' : description;

  return (
    <div className='w-full mb-4'>
      <div className='flex items-center mb-1'>
        {iconUrl && (
          <div className='mr-2'>
            <img src={iconUrl} alt='Icon' width={16} height={16} />
          </div>
        )}
        <div className='text-sm text-gray-800'>
          {displayDomain && <span className='mr-1'>{displayDomain}</span>}
          {displayUrl && <span>{displayUrl}</span>}
        </div>
      </div>
      <h2>
        <a
          className='text-xl text-dark-blue hover:text-dark-orange hover:underline'
          href={url}
          target='_blank'
          dangerouslySetInnerHTML={{ __html: truncatedTitle }}
        />
      </h2>
      <p className='text-sm text-gray-800'>{truncatedDescription}</p>
    </div>
  );
};

export default TextAdItem;
