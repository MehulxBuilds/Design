import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CalendarPlus, LucideIcon, UserPlus, UsersRound, Video, WalletCards } from "lucide-react";

interface BentoCardProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    className?: string;
}

const BentoCardData: BentoCardProps[] = [
    {
        title: "Step 1: Register and Onboard",
        description: "Create account and complete the onboarding.",
        icon: UserPlus,
    },
    {
        title: "Step 2: Create your Events",
        description: "Create and organize events with all the details.",
        icon: CalendarPlus,
    },
    {
        title: "Step 3: Share and Collaborate",
        description: "Invite others, share your events, and collaborate.",
        icon: UsersRound,
    },
    {
        title: "Step 4: Add money to book Calls",
        description: "Add funds securely to your wallet before booking.",
        icon: WalletCards,
    },
    {
        title: "Step 5: Book Calls",
        description: "Choose a convenient time and book your call instantly.",
        className: "col-span-2",
        icon: Video,
    },
];

function BentoCard({
    title,
    description,
    icon: Icon,
    className,
}: BentoCardProps) {
    return (
        <div
            className={cn(
                "h-full w-full rounded-[36px] border border-[#E7E7E7] bg-white p-[10px]",
                className
            )}
        >
            <div className="group relative h-full w-full overflow-hidden rounded-[28px] border border-[#d8d8d8] transition-all duration-500">
                {/* Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(95,122,255,0.25),transparent_70%)]" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col p-8 pb-32">
                    <h3 className="font-helvatica text-[18px] text-[#454545] font-medium leading-[1.2] tracking-[-0.4px]">
                        {title}
                    </h3>

                    <p className="max-w-md font-sans text-[14px] font-medium leading-8 tracking-[-0.2px] text-cta-primary">
                        {description}
                    </p>

                    {Icon && (
                        <div className="absolute inset-x-0 bottom-5 flex justify-center">
                            <GlowingIcon>
                                <Icon className="size-8 text-[#454545]" />
                            </GlowingIcon>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ServiceStepBento() {
    return (
        <section className="mx-auto mt-14 grid max-w-7xl auto-rows-[330px] grid-cols-3 gap-4">
            {BentoCardData.map((card) => (
                <BentoCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    className={card.className}
                />
            ))}
        </section>
    );
}

interface GlowingIconProps {
    children: ReactNode;
    className?: string;
}

export function GlowingIcon({
    children,
    className,
}: GlowingIconProps) {
    return (
        <div
            className={cn(
                "relative flex h-32 w-32 items-center justify-center",
                className
            )}
        >
            {/* Soft pink halo behind the icon */}
            <div className="absolute -bottom-6 h-24 w-40 rounded-full bg-cta-primary/30 blur-3xl" />
            <div className="absolute h-24 w-24 rounded-full bg-cta-primary/20 blur-2xl" />

            {/* Main Circle */}
            <div
                className="
          relative
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
            bg-gradient-to-b
            from-[#ffffff]
            via-white
            to-[#ffd9fc]
          shadow-[0_0_18px_rgba(255,255,255,0.95),0_12px_38px_rgba(95,122,255,0.45)]
        "
            >
                {children}
            </div>
        </div>
    );
}