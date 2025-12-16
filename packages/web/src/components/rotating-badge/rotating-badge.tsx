import React from 'react';
import badgeImage from '../../assets/badge.png';

interface RotatingBadgeProps {
    text: string;
    onClick?: () => void;
    showIcon?: boolean;
    icon?: React.ReactNode;
    className?: string;
}

import { useRotatingBadge } from './use-rotating-badge';

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
    text,
    onClick,
    showIcon = false,
    icon,
    className = "fixed top-4 right-4 md:top-8 md:right-8"
}) => {
    const { repetitions, offsetIncrement } = useRotatingBadge(text);

    return (
        <div
            className={`${className} w-[60px] h-[60px] md:w-[72px] md:h-[72px] lg:w-[154px] lg:h-[154px] ${onClick ? 'cursor-pointer' : ''} z-40 animate-fade-in`}
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            onClick={onClick}
        >
            <div className="w-full h-full animate-[spin_20s_linear_infinite]">
                <img src={badgeImage.src} alt="Badge" className="w-full h-full" />

                <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
                    <defs>
                        <path id="circlePath" d="M 100, 30 a 70,70 0 1,1 0,140 a 70,70 0 1,1 0,-140" />
                    </defs>
                    {Array.from({ length: repetitions }).map((_, index) => (
                        <text key={index} className="text-[16px] font-bold uppercase" fill="black">
                            <textPath href="#circlePath" startOffset={`${index * offsetIncrement}%`}>
                                {text}
                            </textPath>
                        </text>
                    ))}
                </svg>
            </div>

            {showIcon && icon && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {icon}
                </div>
            )}
        </div>
    );
};
