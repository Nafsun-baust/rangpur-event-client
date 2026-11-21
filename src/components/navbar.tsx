"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Leaf, Menu, Moon, Sun, X } from "lucide-react";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
    const [dark, setDark] = useState(
        () => typeof window !== "undefined" && localStorage.getItem("theme") === "dark",
    );
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/upcoming-events", label: "Upcoming Events" },
        ...(user
            ? [
                { href: "/create-event", label: "Create Event" },
                { href: "/manage-events", label: "Manage Events" },
                { href: "/joined-events", label: "Joined Events" },
            ]
            : []),
    ];

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    const toggleTheme = () => {
        const nextDark = !dark;
        setDark(nextDark);
        localStorage.setItem("theme", nextDark ? "dark" : "light");
    };

    const handleSignout = async () => {
        await authClient.signOut();
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
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

                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        type="button"
                        suppressHydrationWarning
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex size-9 items-center justify-center rounded-full border border-border bg-muted/50 text-foreground transition-colors hover:border-emerald-600 hover:text-emerald-600 cursor-pointer"
                    >
                        {isClient && dark ? (
                            <Sun className="size-4 text-amber-400" />
                        ) : (
                            <Moon className="size-4" />
                        )}
                    </button>

                    {isPending ? (
                        <div className="flex items-center gap-3">
                            <div className="size-9 animate-pulse rounded-full bg-muted" />
                            <div className="h-8 w-16 animate-pulse rounded-md bg-muted" />
                        </div>
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <Popover>
                                <PopoverTrigger
                                    render={
                                        <button
                                            type="button"
                                            suppressHydrationWarning
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
                                            href="/profile"
                                            className="text-sm text-foreground transition-colors hover:text-emerald-600"
                                        >
                                            My Profile
                                        </Link>
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

                            <AlertDialog>
                                <AlertDialogTrigger
                                    render={
                                        <Button variant="destructive" size="sm">
                                            Logout
                                        </Button>
                                    }
                                />
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to log out of your RangpurEvent account?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleSignout}>
                                            Logout
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href="/login"
                                className="whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-emerald-600"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="hidden sm:inline-block whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label="Toggle menu"
                        className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden cursor-pointer"
                    >
                        {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="border-t border-border bg-background px-6 py-4 md:hidden">
                    <ul className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={cn(
                                        "block text-sm transition-colors hover:text-emerald-600",
                                        pathname === link.href
                                            ? "font-semibold text-emerald-600"
                                            : "text-muted-foreground",
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        {!user && (
                            <li>
                                <Link
                                    href="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
}