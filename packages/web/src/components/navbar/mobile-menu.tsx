import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { User } from '@/lib/mock-data';

interface MobileMenuProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  handleCreateEventClick: () => void;
  handleSignOut: () => void;
  openAuth: () => void;
}

const MobileMenu = memo(({
  isOpen,
  user,
  onClose,
  handleCreateEventClick,
  handleSignOut,
  openAuth
}: MobileMenuProps) => {
  const t = useTranslations('Navbar');
  const tDiscover = useTranslations('Discover');

  if (!isOpen) return null;

  return createPortal(
    <div className="md:hidden fixed inset-0 z-[3000] flex flex-col animate-in slide-in-from-top duration-300">
      <div className="bg-[#1A1A1A] flex items-center justify-center py-16 animate-in fade-in duration-500">
        <button
          onClick={onClose}
          className="text-white text-[11px] font-medium uppercase tracking-wider"
        >
          CLOSE
        </button>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <Link
          href="/"
          onClick={onClose}
          className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase border-b border-black tracking-[-0.34px] animate-fade-in"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          {tDiscover('discover')}
        </Link>
        <button
          onClick={handleCreateEventClick}
          className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase border-b border-black tracking-[-0.34px] animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          {t('createEvent')}
        </button>
        {user ? (
          <>
            <Link
              href="/my-events"
              onClick={onClose}
              className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase border-b border-black tracking-[-0.34px] animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              {t('myEvents')}
            </Link>
            <button
              onClick={handleSignOut}
              className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase tracking-[-0.34px] animate-fade-in"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              {t('signOut')}
            </button>
          </>
        ) : (
          <button
            onClick={openAuth}
            className="flex-1 flex items-center justify-center text-[#1A1A1A] text-[17px] font-medium uppercase tracking-[-0.34px] animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            {t('signIn')}
          </button>
        )}
      </div>
    </div>,
    document.body
  );
});

MobileMenu.displayName = 'MobileMenu';

export { MobileMenu };
