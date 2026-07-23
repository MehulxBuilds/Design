import Link from "next/link";
import { ArrowUpRight, Circle, Mail, PhoneCall, Sparkles } from "lucide-react";
import { designall } from "@/actions/design";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TextAnimation from "@/components/modules/dashboard/text-animation";
import { EmailLogo, GithubLogo, InstagramLogo, LinkedInLogo, MediumLogo, PinterestLogo, TwitterLogo } from '@/components/modules/dashboard/data/svg-logo';
import { Hint } from "@/components/ui/hint";
import ImageAnimation from "@/components/modules/dashboard/image-animation";
import { NAMES, ROLES, SOCIALS } from "@/components/modules/dashboard/data";
import CalDotCom from "@/components/modules/cal-dot-com";
import { getGitHubStars } from "@/lib/github";
import IstClock from "@/components/modules/ist-clock";
import SmoothScrollContainer from "@/components/smooth-scroll-container";
import DesignCard from "@/components/modules/root/design-card";

export default async function Home() {
  const result = await designall();
  const github = await getGitHubStars();
  const designs = result.success ? result.design : [];

  return (
    <main
      data-lenis-gallery-page
      className="min-h-svh bg-[#e9e9e7] p-2 text-zinc-950 sm:p-3 font-sans lg:h-svh lg:overflow-hidden"
    >
      <div className="mx-auto grid min-h-[calc(100svh-1rem)] max-w-[1800px] grid-cols-1 gap-2 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(290px,1fr)_minmax(0,2fr)]">
        <aside className="flex min-h-[600px] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white lg:sticky lg:top-3 lg:h-[calc(100svh-1.5rem)]">
          <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="size-4 text-yellow-400" fill="oklch(85.2% 0.199 91.936)" />
              <div className='relative h-6 flex items-center overflow-hidden'>
                <TextAnimation classname="text-[13px] sm:text-[16px] font-semibold text-neutral-600 tracking-tight" roles={NAMES} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="https://github.com/MehulxBuilds/Design" target="_blank" className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium transition hover:bg-zinc-100 flex items-center justify-center gap-1.5 text-neutral-400">
                <p>{github}</p>
                <GithubLogo />
              </Link>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-7">
            <div className="mb-4 flex items-start justify-between">

              <div className="shrink-0 relative">
                <Image
                  src="/image/logo.png"
                  alt="MehulxDesign"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-26 sm:h-26 rounded-full object-cover border-3 border-red-900"
                  priority
                />

                <Button className='font-medium tracking-tight bg-white px-1 h-4 flex items-center justify-center gap-2.5 rounded-full hover:bg-neutral-50 hover:border-neutral-300 text-neutral-800 transition-all absolute bottom-0 sm:bottom-1 right-0 sm:right-1.5'>
                  <span className="relative flex items-center justify-center size-3">
                    <span className="absolute inline-flex size-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex size-1.75 rounded-full bg-green-500" />
                  </span>
                </Button>
              </div>

              <div className="hidden">
                India • IST
              </div>
              <IstClock />
            </div>

            <div className="mt-20 flex flex-col justify-center gap-3">
              <div className="text-sm text-zinc-400 flex items-center gap-1">
                <p>India •</p>
                <div className='relative h-6 flex items-center overflow-hidden'>
                  <TextAnimation classname="" roles={ROLES} />
                </div>
              </div>
              <h1 className="max-w-sm text-3xl font-semibold tracking-[-1.2px] sm:text-3xl text-neutral-700">
                Helping startups turn visitors into loyal customers through thoughtful design.
              </h1>
              <p className="mt-1 max-w-md text-[14px] leading-5 text-neutral-600 tracking-[-0.2px]">
                I combine visual design, product thinking, and development to turn ideas into thoughtful identities and interfaces. This space collects selected work, experiments, and shipped projects.
              </p>
            </div>

            <div className="mt-6 gap-3">
              <CalDotCom className='font-medium tracking-tight bg-[#3b3b3b] border-2 border-[#c3c3c3] px-3 h-8.5 flex items-center justify-center gap-5 rounded-full hover:bg-[#222222] drop-shadow-md drop-shadow-neutral-400'>
                <span className="relative flex items-center justify-center size-3">
                  <span className="absolute inline-flex size-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex size-1.75 rounded-full bg-green-500" />
                </span>
                <p className='text-[12.5px] sm:text-[13px]'>Book a Call</p>
                <PhoneCall className='text-white size-3.5' />
              </CalDotCom>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-4">
              <div className='flex min-w-0 flex-1 items-center gap-2'>
                <ImageAnimation data={SOCIALS} classname='rounded-full flex items-center justify-center size-4' />
                <p className="text-gray-500 tracking-[0.1px] flex items-center gap-1 text-xs">
                  <span>{"The Social's I'm On"}</span>
                </p>
              </div>
              <div className='flex shrink-0 items-center justify-end gap-1.5 text-[13.5px]'>
                <Hint label='Twitter' align='center' side='right'>
                  <Link href={'https://x.com/MehulxBuilds'} target='_blank'>
                    <TwitterLogo />
                  </Link>
                </Hint>
                <Hint label='Github' align='center' side='right'>
                  <Link href={'https://github.com/MehulxBuilds'} target='_blank'>
                    <GithubLogo />
                  </Link>
                </Hint>
                <Hint label='LinkedIn' align='center' side='right'>
                  <Link href={'https://www.linkedin.com/in/mehul-prajapati-816b28315/'} target='_blank'>
                    <LinkedInLogo />
                  </Link>
                </Hint>
                <Hint label='Instagram' align='center' side='right'>
                  <Link href={'https://www.instagram.com/mehulxbuilds/'} target='_blank'>
                    <InstagramLogo />
                  </Link>
                </Hint>
                <Hint label='Medium' align='center' side='right'>
                  <Link href={'https://medium.com/@mehulxbuilds'} target='_blank'>
                    <MediumLogo />
                  </Link>
                </Hint>
                <Hint label='Pinterest' align='center' side='right'>
                  <Link href={'https://github.com/MehulxBuilds'} target='_blank'>
                    <PinterestLogo />
                  </Link>
                </Hint>
                <Hint label='Email' align='center' side='right'>
                  <Link href={'mailto:mehulprajapati7456e@gmail.com'}>
                    <EmailLogo />
                  </Link>
                </Hint>
              </div>
            </div>
          </div>
        </aside>

        <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white lg:flex lg:h-full lg:min-h-0 lg:flex-col">
          <header className="z-20 flex shrink-0 items-center justify-between border-b border-zinc-100 bg-white/90 px-5 py-3 backdrop-blur sm:px-7">
            <div>
              <p className="text-sm font-semibold">Selected designs</p>
            </div>
            <Link href={"https://mehulxbuilds.in/"} target="_blank" className="inline-flex rounded-full border border-zinc-200 px-3 py-[5px] text-xs font-medium transition hover:bg-zinc-100 items-center gap-1.5 text-neutral-600 tracking-[-0.1px]">
              Know more
              <ArrowUpRight className="size-3.5" />
            </Link>
          </header>

          {designs.length ? (
            <SmoothScrollContainer>
              <div className="columns-1 gap-3 p-2 sm:columns-2">
                {designs.map((design) => (
                  <div key={design.id} className="mb-2.5 break-inside-avoid border border-neutral-200">
                    <DesignCard design={design} />
                  </div>
                ))}
              </div>
            </SmoothScrollContainer>
          ) : (
            <div className="flex min-h-[70svh] items-center justify-center p-8 text-center">
              <div>
                <Sparkles className="mx-auto mb-4 size-7 text-zinc-300" />
                <h2 className="text-lg font-medium">Work is on the way</h2>
                <p className="mt-2 text-sm text-zinc-500">Published designs will appear here.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
