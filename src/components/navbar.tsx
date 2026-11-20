"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Moon, Sun } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/upcoming-events", label: "Upcoming Events" },
    { href: "/create-event", label: "Create Event" },
    { href: "/joined-events", label: "Joined Events" },
];

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const nextDark = !dark;
        setDark(nextDark);
        if (nextDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const handleSignout = () => {
        authClient.signOut();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground"
                >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                        <Leaf className="size-5" />
                    </span>
                    <span>
                        Rangpur<span className="text-emerald-600">Event</span>
                    </span>
                </Link>

                <ul className="hidden md:flex items-center gap-7">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "text-sm transition-colors hover:text-emerald-600",
                                    pathname === link.href
                                        ? "border-b-2 border-emerald-600 pb-1 font-semibold text-emerald-600"
                                        : "text-muted-foreground",
                                )}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex size-9 items-center justify-center rounded-full border border-border bg-muted/50 text-foreground transition-colors hover:border-emerald-600 hover:text-emerald-600 cursor-pointer"
                    >
                        {dark ? (
                            <Sun className="size-4 text-amber-400" />
                        ) : (
                            <Moon className="size-4" />
                        )}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <Popover>
                                <PopoverTrigger
                                    render={
                                        <button
                                            type="button"
                                            title={user?.name}
                                            className="rounded-full ring-2 ring-emerald-600/30 transition hover:ring-emerald-600 focus:outline-none cursor-pointer"
                                        >
                                            <Avatar>
                                                <AvatarImage
                                                    referrerPolicy="no-referrer"
                                                    src={user?.image as string}
                                                />
                                                <AvatarFallback className="bg-emerald-600 text-white font-semibold">
                                                    {user?.name?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </button>
                                    }
                                />
                                <PopoverContent className="w-56">
                                    <PopoverHeader>
                                        <PopoverTitle>{user?.name}</PopoverTitle>
                                    </PopoverHeader>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user?.email}
                                    </p>
                                    <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                                        <Link
                                            href="/create-event"
                                            className="text-sm text-foreground transition-colors hover:text-emerald-600"
                                        >
                                            Create Event
                                        </Link>
                                        <Link
                                            href="/manage-events"
                                            className="text-sm text-foreground transition-colors hover:text-emerald-600"
                                        >
                                            Manage Events
                                        </Link>
                                        <Link
                                            href="/joined-events"
                                            className="text-sm text-foreground transition-colors hover:text-emerald-600"
                                        >
                                            Joined Events
                                        </Link>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <Button
                                onClick={handleSignout}
                                variant="destructive"
                                size="sm"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-foreground transition-colors hover:text-emerald-600"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}