import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DiscordIcon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { CtaButton } from "../components/cta-button";
import { DarkLogo } from "./logo";
import { Separator } from "@/components/ui/separator";

const footerGroups = [
  {
    title: "Navigation",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "API Documentation", href: "#docs" },
      { label: "Analytics", href: "#analytics" },
      { label: "Careers", href: "#careers" },
      { label: "Blogs", href: "#blogs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Updates", href: "#updates" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Help",
    links: [
        { label: "Contact", href: "#contact" },
        { label: "Report", href: "#report" }
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms and Conditions", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Cookies", href: "#cookies" },
    ],
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "#linkedin", icon: Linkedin01Icon },
  { label: "X", href: "#x", icon: NewTwitterIcon },
  { label: "Discord", href: "#discord", icon: DiscordIcon },
  { label: "Instagram", href: "#instagram", icon: InstagramIcon },
];

const Footer = () => {
  return (
    <footer className="w-full text-[#17233c] flex flex-col items-center justify-center gap-28">
      
      <section className="mx-auto w-full max-w-[1530px] rounded-t-[20px] border bg-[#fcfcfc] px-8 pb-8 pt-14 md:px-12">
        <div className="grid gap-12 md:grid-cols-[3fr_repeat(4,minmax(130px,1fr))] md:gap-10">
          <div>
            <Link href="#home" className="flex items-center gap-1">
              <DarkLogo height={50} weight={50} />
              <span className="text-[34px] font-bold tracking-[-1.2px] text-[#031129]">
                Nox
              </span>
            </Link>
            <p className="mt-9 max-w-[280px] text-[20px] font-medium leading-[1.45] tracking-[-0.8px] text-[#24334f]">
              Book your call's seamlessly,
              Without getting ghosted
            </p>
            <div className="w-[200px] py-3">
                <Separator />
            </div>
            <p className="mt-1 max-w-[280px] text-[12px] font-medium leading-[1.45] tracking-[0.1px] text-[#5f6673]">
              Built by <Link target="_blank" href={"https://x.com/MehulxBuilds"} className="hover:text-cta-primary transition-all ease-in-out duration-300">@MehulxBuilds</Link>
            </p>
            <CtaButton label="Get Started!" variant="primary" icon="arrow" className="mt-6 hidden w-[140px] md:flex" />
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} aria-label={group.title}>
              <h3 className="text-[18px] font-semibold tracking-[-0.4px] text-[#031129]">
                {group.title}
              </h3>
              <div className="mt-7 flex flex-col gap-3 font-sans text-[14px] font-medium tracking-[-0.5px] text-[#5f6673]">
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href} className="transition hover:text-cta-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[#e5eaf0] pt-12">
          <div className="flex justify-center gap-8">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="text-[#9aa3af] transition hover:text-cta-primary"
              >
                <HugeiconsIcon icon={link.icon} strokeWidth={2} className="size-7" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="relative -mt-30 h-[280px] w-full max-w-[1530px] overflow-hidden bg-[#f8fafc] md:h-[260px] border-b border-x rounded-b-[20px]">
        <p className="absolute inset-x-0 bottom-[-72px] select-none text-center text-[170px] font-bold leading-none tracking-[-8px] text-[#d9d9d9] md:bottom-[-110px] md:text-[360px] md:tracking-[-18px]">
          NOX
        </p>
       <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-[#FCFCFC] via-[#f8fafc]/55 to-white" />
      </div>
    </footer>
  );
};

export default Footer;