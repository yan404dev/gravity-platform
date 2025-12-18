import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useAuthSheet } from './use-auth-sheet';

interface AuthSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthSheet: React.FC<AuthSheetProps> = ({ isOpen, onClose }) => {
    const { isSignUp, loading, register, errors, handleSubmit, toggleMode } =
        useAuthSheet(onClose);

    if (!isOpen || typeof window === 'undefined') return null;

    return createPortal(
        <>
            <div
                className="fixed inset-0 z-[1000] bg-black opacity-50"
                onClick={onClose}
            />

            <div
                className={`fixed top-0 right-0 z-[1001] h-full w-full max-w-md bg-[#1A1A1A] shadow-2xl transition-transform duration-300 ${isOpen ? 'animate-slide-in-right' : ''}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-white transition-colors hover:text-gray-300"
                >
                    <X size={24} />
                </button>

                <div className="flex h-full flex-col px-10 pt-24 pb-10">
                    <h2 className="mb-2 text-4xl font-medium text-white">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </h2>
                    <p className="mb-8 text-sm text-gray-400">
                        {isSignUp
                            ? 'Join us to create and manage your events'
                            : 'Welcome back! Please sign in to continue'}
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium tracking-wide text-white uppercase"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className="w-full border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-[#FA76FF] focus:outline-none"
                                placeholder="your@email.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium tracking-wide text-white uppercase"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register('password')}
                                className="w-full border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-[#FA76FF] focus:outline-none"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full border border-black bg-[#FA76FF] px-6 py-3 text-sm font-medium text-black uppercase transition-colors hover:bg-[#ff8fff] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? 'Please wait...'
                                : isSignUp
                                  ? 'Create Account'
                                  : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={toggleMode}
                            className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            {isSignUp
                                ? 'Already have an account? Sign in'
                                : "Don't have an account? Create one"}
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.body,
    );
};
