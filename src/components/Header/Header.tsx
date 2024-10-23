'use client';

import { Input } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TabBar, setUrlParameter } from '../common';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppContext } from '../context';

export const Header = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const { query, setQuery } = useAppContext();

  useEffect(() => {
    const searchQuery = searchParams.get('query');
    if (searchQuery) {
      setInputValue(searchQuery);
      setQuery(searchQuery);
    }
  }, []);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUrlParameter('query', inputValue);
    setQuery(inputValue);

    // Trigger a new route with the updated query
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('query', inputValue);
    router.push(`/?${currentParams.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <header>
      <div className='w-100 border-b border-gray-300'>
        <div className='flex flex-row items-center md:items-left'>
          <div>
            <div className='ml-8 flex flex-row h-20 items-center justify-center'>
              <div className='pr-8'>
                <a href='/'>
                  <Image
                    src='/deal-findr.png'
                    alt='DealFinder logo'
                    width={96}
                    height={40}
                    priority
                  />
                </a>
              </div>
              <form onSubmit={submitHandler}>
                <div className='w-full lg:w-[650px] shadow-md'>
                  <Input
                    size='lg'
                    onChange={handleInputChange}
                    value={inputValue}
                    label='Search'
                    icon={<FontAwesomeIcon icon={faSearch} />}
                  />
                </div>
              </form>
            </div>
            {query && <TabBar />}
          </div>
        </div>
      </div>
    </header>
  );
};
