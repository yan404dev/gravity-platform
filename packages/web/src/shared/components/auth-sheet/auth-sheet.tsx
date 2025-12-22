import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthSheet } from './use-auth-sheet';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger
} from '@/shared/components/ui/sheet';

interface AuthSheetProps {
    children?: React.ReactNode;
}

export const AuthSheet = ({ children }: AuthSheetProps) => {
    const t = useTranslations('AuthSheet');
    const [isOpen, setIsOpen] = useState(false);
    const { isSignUp, loading, register, errors, handleSubmit, toggleMode } =
        useAuthSheet(() => setIsOpen(false));

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {children && <SheetTrigger asChild>{children}</SheetTrigger>}
            <SheetContent className="w-full max-w-md bg-[#1A1A1A] p-0 border-l border-white/10 sm:max-w-md">
                <div className="flex h-full flex-col px-10 pt-24 pb-10">
                    <SheetHeader className="mb-8 text-left">
                        <SheetTitle className="mb-2 text-4xl font-medium text-white">
                            {isSignUp ? t('title.create') : t('title.signIn')}
                        </SheetTitle>
                        <SheetDescription className="text-sm text-gray-400">
                            {isSignUp
                                ? t('description.create')
                                : t('description.signIn')}
                        </SheetDescription>
                    </SheetHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        {isSignUp && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium tracking-wide text-white uppercase"
                                >
                                    {t('name.label')}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className="w-full border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-[#FA76FF] focus:outline-none"
                                    placeholder={t('name.placeholder')}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium tracking-wide text-white uppercase"
                            >
                                {t('email.label')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className="w-full border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-[#FA76FF] focus:outline-none"
                                placeholder={t('email.placeholder')}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {t('email.error')}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium tracking-wide text-white uppercase"
                            >
                                {t('password.label')}
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register('password')}
                                className="w-full border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-[#FA76FF] focus:outline-none"
                                placeholder={t('password.placeholder')}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    {t('password.error')}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full border border-black bg-[#FA76FF] px-6 py-3 text-sm font-medium text-black uppercase transition-colors hover:bg-[#ff8fff] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? t('submit.loading')
                                : isSignUp
                                    ? t('submit.create')
                                    : t('submit.signIn')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={toggleMode}
                            className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            {isSignUp
                                ? t('toggle.toSignIn')
                                : t('toggle.toCreate')}
                        </button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
