import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight02Icon, ArrowRight02Icon, CallIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconType = "arrow" | "arrow-right" | "call";

interface CtaButtonProps {
  label: string;
  variant?: "primary" | "dark";
  icon?: IconType;
  className?: string;
}

const iconMap = {
  arrow: ArrowUpRight02Icon,
  "arrow-right": ArrowRight02Icon,
  call: CallIcon,
};

export const CtaButton = ({ label, variant = "primary", icon = "arrow", className }: CtaButtonProps) => {
  const IconComponent = iconMap[icon];

  if (variant === "dark") {
    return (
      <Button
        className={cn(
          "relative min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] dark:bg-[#2C2C2C] px-5 dark:text-white text-[#2C2C2C] bg-white transition-all duration-300 hover:bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] font-medium",
          className
        )}
      >
        <HugeiconsIcon icon={IconComponent} fill="#2c2c2c" className="size-5" />
        <span className="font-sans text-[14px] font-semibold tracking-[-0.8px]">{label}</span>
      </Button>
    );
  }

  return (
    <Button
      className={cn(
        "group relative min-h-11 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[10px] hover:bg-cta-primary/80 shadow-cta-primary/20 border-white shadow-xl bg-cta-primary px-5 text-white transition-all duration-300",
        className
      )}
    >
      <HugeiconsIcon icon={IconComponent} fill="white" className="relative size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <span className="relative font-sans text-[14px] font-semibold tracking-[-0.8px]">{label}</span>
    </Button>
  );
};