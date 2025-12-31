'use client';

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
import { Form } from '@/shared/components/ui/form';
import { TextField } from '@/shared/components/ui/text-field';

interface AuthSheetProps {
    children?: React.ReactNode;
}

export const AuthSheet = ({ children }: AuthSheetProps) => {
    const t = useTranslations('AuthSheet');
    const [isOpen, setIsOpen] = useState(false);
    const { isSignUp, loading, form, onSubmit, toggleMode, visibleFields } =
        useAuthSheet(() => setIsOpen(false));

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {children && <SheetTrigger asChild>{children}</SheetTrigger>}
            <SheetContent className="w-full max-w-md bg-[#1A1A1A] p-0 border-l border-white/10 sm:max-w-md z-50">
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

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-6"
                        >
                            {visibleFields.map(({ name, type, labelKey }) => (
                                <TextField
                                    key={name}
                                    control={form.control}
                                    name={name}
                                    type={type}
                                    label={t(`${labelKey}.label`)}
                                    placeholder={t(`${labelKey}.placeholder`)}
                                />
                            ))}

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
                    </Form>

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
