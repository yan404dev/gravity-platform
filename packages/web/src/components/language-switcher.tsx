"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.replace({ pathname }, { locale: newLocale });
  };

  return (
    <div className="flex gap-2 text-xs font-medium uppercase border border-black h-[34px] items-center px-2 bg-white ml-2">
      <button
        onClick={() => handleChange('en')}
        className={locale === 'en' ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => handleChange('pt')}
        className={locale === 'pt' ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}
      >
        PT
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => handleChange('es')}
        className={locale === 'es' ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}
      >
        ES
      </button>
    </div>
  );
};
