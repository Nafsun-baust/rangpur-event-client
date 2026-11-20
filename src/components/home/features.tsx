import { CalendarPlus, HeartHandshake, ShieldCheck, Users } from "lucide-react";

const features = [
    {
        icon: CalendarPlus,
        title: "Organize Local Drives",
        description:
            "Create tree plantation, canal cleanup, or relief distribution events anywhere in Rangpur within minutes.",
    },
    {
        icon: Users,
        title: "Join as Volunteer",
        description:
            "Explore upcoming community initiatives in your area and join hands with local volunteers with one click.",
    },
    {
        icon: HeartHandshake,
        title: "Community Impact",
        description:
            "Work together on real social challenges from winter blanket drives to plastic-free neighborhood campaigns.",
    },
    {
        icon: ShieldCheck,
        title: "Easy Management",
        description:
            "Update your created events anytime and track all your joined volunteer schedules sorted by event date.",
    },
];

export function Features() {
    return (
        <section className="w-full bg-slate-50 py-20 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">
                        How It Works
                    </span>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                        Empowering Rangpur Through Social Action
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Everything you need to host, discover, and participate in community development events
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="rounded-xl border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-md"
                            >
                                <div className="flex size-12 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-600">
                                    <Icon className="size-6" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-foreground">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}