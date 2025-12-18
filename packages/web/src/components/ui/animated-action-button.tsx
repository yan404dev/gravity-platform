import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isSubmitting: boolean;
    defaultText: string;
    submittingText: string;
    variant?: 'primary' | 'danger';
}

export const AnimatedActionButton: React.FC<AnimatedActionButtonProps> = ({
    isSubmitting,
    defaultText,
    submittingText,
    variant = 'primary',
    className,
    ...props
}) => {
    const baseStyles =
        'flex h-[50px] justify-center items-center gap-2.5 border relative px-2.5 py-3.5 border-solid transition-all duration-300 ease-in-out w-full z-10 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary:
            'bg-[#1A1A1A] border-[#1A1A1A] group-hover:bg-[#FA76FF] group-hover:border-[#FA76FF]',
        danger: 'bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 w-full',
    };

    const textVariants = {
        primary:
            'text-white text-[13px] font-normal uppercase relative transition-colors duration-300 group-hover:text-black',
        danger: 'text-white text-[13px] font-normal uppercase relative',
    };

    if (variant === 'danger') {
        return (
            <button
                className={cn(baseStyles, variants.danger, className)}
                disabled={isSubmitting}
                {...props}
            >
                <span className={textVariants.danger}>
                    {isSubmitting ? submittingText : defaultText}
                </span>
            </button>
        );
    }

    return (
        <div className="group relative flex flex-1 items-center self-stretch overflow-hidden">
            <button
                className={cn(baseStyles, variants.primary, className)}
                disabled={isSubmitting}
                {...props}
            >
                <span className={textVariants.primary}>
                    {isSubmitting ? submittingText : defaultText}
                </span>
            </button>
        </div>
    );
};
