'use client';
import { useEffect, useState } from 'react';

export const ClientIP = ({
  onIpAndMarketCodeReceived,
}: {
  onIpAndMarketCodeReceived: (ip: string, marketCode: string) => void;
}) => {
  const [ip, setIp] = useState<string>('');
  const [marketCode, setMarketCode] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const { ip: ipAddress, country: countryCode } = await response.json();

        const marketCodes: Record<string, string> = {
          AR: 'es-AR', AU: 'en-AU', AT: 'de-AT', BE: 'nl-BE', 'BE-FR': 'fr-BE',
          BR: 'pt-BR', BG: 'bg-BG', CA: 'en-CA', 'CA-FR': 'fr-CA', CL: 'es-CL',
          CO: 'es-CO', HR: 'hr-HR', CZ: 'cs-CZ', DK: 'da-DK', EG: 'ar-EG',
          EE: 'et-EE', FI: 'fi-FI', FR: 'fr-FR', DE: 'de-DE', GR: 'el-GR',
          HK: 'zh-HK', HU: 'hu-HU', IN: 'en-IN', ID: 'en-ID', 'ID-ID': 'id-ID',
          IE: 'en-IE', IL: 'he-IL', IT: 'it-IT', JP: 'ja-JP', LV: 'lv-LV', LT: 'lt-LT',
          MY: 'en-MY', 'MY-MS': 'ms-MY', MX: 'es-MX', NL: 'nl-NL', NZ: 'en-NZ',
          NO: 'no-NO', PE: 'es-PE', PH: 'tl-PH', 'PH-EN': 'en-PH', PL: 'pl-PL',
          PT: 'pt-PT', RO: 'ro-RO', RU: 'ru-RU', SA: 'ar-SA', SG: 'en-SG',
          SK: 'sk-SK', SL: 'sl-SL', ZA: 'en-ZA', ES: 'es-ES', 'ES-CA': 'ca-ES',
          SE: 'sv-SE', CH: 'fr-CH', 'CH-DE': 'de-CH', 'CH-IT': 'it-CH',
          TW: 'zh-TW', TH: 'th-TH', TR: 'tr-TR', AE: 'ar-AE', GB: 'en-GB',
          US: 'en-US', 'US-ES': 'es-US', VE: 'es-VE', VN: 'vi-VN'
        };

        const code = marketCodes[countryCode] || 'en-US';

        setIp(ipAddress);
        setMarketCode(code);
        onIpAndMarketCodeReceived(ipAddress, code);
      } catch (error) {
        console.error('Failed to fetch IP:', error);
        setIp('0.0.0.0');
        setMarketCode('en-US');
        onIpAndMarketCodeReceived('0.0.0.0', 'en-US');
      }
    })();
  }, [onIpAndMarketCodeReceived]);

  return <div className='text-sm text-gray-500 ml-2'></div>;
};
