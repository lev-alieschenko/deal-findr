'use client';
import { useEffect, useState } from 'react';

export const ClientIP = ({
  onIpReceived,
}: {
  onIpReceived: (ip: string) => void;
}) => {
  const [ip, setIp] = useState<string>('');

  useEffect(() => {
    const getIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);
        onIpReceived(data.ip);
      } catch (error) {
        console.error('Failed to fetch IP:', error);
        setIp('0.0.0.0');
        onIpReceived('0.0.0.0');
      }
    };

    getIP();
  }, [onIpReceived]);

  return <div className='text-sm text-gray-500 ml-2'>Your IP: {ip}</div>;
};
