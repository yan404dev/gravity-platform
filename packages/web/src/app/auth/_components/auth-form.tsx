"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { authSchema, AuthFormData } from "../_schemas/auth.schema";

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.push("/admin");
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                router.push("/admin");
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const onSubmit = async (data: AuthFormData) => {
        setLoading(true);
        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                });
                if (error) throw error;
                toast({
                    title: "Success",
                    description: "Logged in successfully",
                });
            } else {
                const { error } = await supabase.auth.signUp({
                    email: data.email,
                    password: data.password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/admin`,
                    },
                });
                if (error) throw error;
                toast({
                    title: "Success",
                    description: "Account created successfully",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <div>
                <h2 className="text-4xl font-normal text-[#1A1A1A] tracking-[-0.02em]">
                    {isLogin ? "Sign In" : "Sign Up"}
                </h2>
                <p className="mt-2 text-sm text-[#1A1A1A] opacity-50">
                    {isLogin
                        ? "Sign in to manage events"
                        : "Create an account to manage events"}
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <Input
                        type="email"
                        placeholder="Email"
                        className="border-[#1A1A1A] text-[#1A1A1A]"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <Input
                        type="password"
                        placeholder="Password"
                        className="border-[#1A1A1A] text-[#1A1A1A]"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1A1A1A] text-white hover:bg-opacity-90"
                >
                    {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
                </Button>
            </form>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-[#1A1A1A] hover:opacity-70 transition-opacity"
            >
                {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
            </button>
        </div>
    );
}
