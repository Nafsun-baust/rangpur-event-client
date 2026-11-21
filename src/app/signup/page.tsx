"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const router = useRouter();

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            image: string;
            email: string;
            password: string;
        };

               if (!/[A-Z]/.test(user.password)) {
            setErrorMsg("Password must contain at least one uppercase letter.");
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(user.password)) {
            setErrorMsg("Password must contain at least one lowercase letter.");
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }
        if (user.password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long.");
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        const { data, error } = await authClient.signUp.email({
            ...user,
        });

        if (data) {
            await authClient.signOut();
            setSuccessMsg("Account created successfully! Please login.");
            toast.success("Account created successfully! Please login.");
            setTimeout(() => {
                router.push("/login");
            }, 800);
        }

        if (error) {
            setErrorMsg(error.message || "Sign up failed");
            toast.error(error.message || "Sign up failed");
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-md w-full mx-auto my-12 px-4">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create an Account</CardTitle>
                    <CardDescription>
                        Sign up to create and join social events in Rangpur
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {errorMsg && (
                        <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div className="mb-4 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-700">
                            {successMsg}
                        </div>
                    )}
                    <form onSubmit={handleEmailSignUp}>
                        <FieldGroup>
                            <Field>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Continue with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="image">photoURL</FieldLabel>
                                <Input
                                    id="image"
                                    type="url"
                                    name="image"
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="nafsun@gmail.com"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" name="password" type="password" required />
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                    Sign Up
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-emerald-600 underline">
                                        Login
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}