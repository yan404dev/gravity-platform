'use client';

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
        <div className="ml-2 flex h-[34px] items-center gap-2 border border-black bg-white px-2 text-xs font-medium uppercase">
            <button
                onClick={() => handleChange('en')}
                className={
                    locale === 'en'
                        ? 'font-bold text-black'
                        : 'text-gray-400 hover:text-black'
                }
            >
                EN
            </button>
            <span className="text-gray-300">|</span>
            <button
                onClick={() => handleChange('pt')}
                className={
                    locale === 'pt'
                        ? 'font-bold text-black'
                        : 'text-gray-400 hover:text-black'
                }
            >
                PT
            </button>
            <span className="text-gray-300">|</span>
            <button
                onClick={() => handleChange('es')}
                className={
                    locale === 'es'
                        ? 'font-bold text-black'
                        : 'text-gray-400 hover:text-black'
                }
            >
                ES
            </button>
        </div>
    );
};
