import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon } from "@hugeicons/core-free-icons";
import { CtaButton } from "../components/cta-button";
import { BrandsMarquee } from "./brands-marquee";

const Landing = () => {
  return (
    <section
      id="home"
      className="relative flex w-full overflow-hidden rounded-[18px] bg-white px-4 pb-14 pt-6 md:px-6"
    >

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[45%] opacity-100 [background-image:linear-gradient(rgba(15,23,42,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.11)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_right,black,transparent)] md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] opacity-100 [background-image:linear-gradient(rgba(15,23,42,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.11)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_left,black,transparent)] md:block" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center">
        <div className="mt-20 flex w-full flex-col items-center text-center md:mt-30">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ecf0f4] bg-[#f8fafc] px-6 py-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5f7aff] shadow-[0_0_6px_rgba(0,163,58,0.4)]" />
            <span className="text-[13px] font-medium tracking-[-0.2px] text-[#5f7aff]">
              Trusted by 300k+ Hardcore Builders!
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 max-w-[1120px] font-semibold leading-[1.08] tracking-[-4px] text-[#454545] md:text-[56px]">
            Book Call's Seamlessly
            <br />
            <div className="flex items-center font-helvetica justify-between gap-0">
                <p className="text-cta-primary font-bubbledot tracking-[-2px]">Without Getting Ghosted</p>
            </div>
          </h1>

          {/* Description */}
          <div className="max-w-[720px] font-medium leading-[1.45] tracking-normal text-[#626262] md:text-[16px]">
            <p className="mt-8">
              Every booked call deserves to happen.
            </p>
            <p>
              Smart reminders reduce ghostings and last-minute cancellations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 hidden flex-col items-center justify-center gap-4 sm:flex-row md:flex">
            <CtaButton label="Get Started!" icon="arrow" className="w-[160px]" />
            <CtaButton label="Book a Call" variant="dark" icon="call" className="w-[160px]" />
          </div>

          {/* Stats */}
          <div className="mt-14 flex items-center gap-0 rounded-2xl border border-[#f0f0f0] bg-[#373737] px-2 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:gap-0 md:px-4">
            {[
              { value: "300k+", label: "Peoples" },
            //   { value: "99.8%", label: "up-time" },
              { value: "99.2%", label: "show-up rate" },
              { value: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <div key={stat.label} className="flex items-center">
                <div className="flex flex-col items-center px-5 md:px-8">
                  <span className="text-[20px] font-bold tracking-tight text-white md:text-[24px]">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.5px] text-[#d4d4d4]">
                    {stat.label}
                  </span>
                </div>
                {idx < 2 && <div className="h-8 w-px bg-[#eaeaea]" />}
              </div>
            ))}
          </div>

          {/* Partners */}
          <div className="mt-18 flex items-center gap-2 text-[14px] font-medium tracking-[-0.2px] text-[#5f7aff]">
            <HugeiconsIcon icon={Award01Icon} strokeWidth={2} className="size-4" />
            Brands we work with
          </div>
          <p className="mt-3 text-[18px] font-medium tracking-normal text-[#2d2d2d]">
            Trusted by <strong className="font-bold text-[#454545]">100+ Trusted Brands</strong> worldwide
          </p>

          <div className="mt-8 w-full max-w-[1040px]">
            <BrandsMarquee />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;