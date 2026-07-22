import Link from "next/link";
import { ArrowUpRight, Circle, Mail, PhoneCall, Sparkles } from "lucide-react";
import { designall } from "@/actions/design";
import ViewDesignModal from "@/components/modules/dashboard/view-design-modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TextAnimation from "@/components/modules/dashboard/text-animation";
import { EmailLogo, GithubLogo, InstagramLogo, LinkedInLogo, MediumLogo, PinterestLogo, TwitterLogo } from '@/components/modules/dashboard/data/svg-logo';
import { Hint } from "@/components/ui/hint";
import ImageAnimation from "@/components/modules/dashboard/image-animation";
import { NAMES, SOCIALS } from "@/components/modules/dashboard/data";
import CalDotCom from "@/components/modules/cal-dot-com";

export default async function Home() {
  const result = await designall();
  const designs = result.success ? result.design : [];

  return (
    <main className="min-h-svh bg-[#e9e9e7] p-2 text-zinc-950 sm:p-3 font-sans lg:h-svh lg:overflow-hidden">
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
              <span className="rounded-full bg-[#ff57df] px-3 py-1 text-xs font-medium">Info</span>
              <Link href="/access" className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium transition hover:bg-zinc-100">
                Access
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

              <div className="flex items-center gap-2 text-xs text-zinc-400">
                India • IST
              </div>
            </div>

            <div className="mt-20 flex flex-col justify-center gap-3">
              <span className="text-sm text-zinc-400">India • Designer</span>
              <h1 className="max-w-md text-3xl font-semibold tracking-[-1.2px] sm:text-3xl text-neutral-700">
                Helping startups turn visitors into loyal customers through thoughtful design.
              </h1>
              <p className="mt-1 max-w-lg text-[14px] leading-5 text-neutral-600 tracking-[-0.2px]">
                I combine visual design, product thinking, and development to turn ideas into thoughtful identities and interfaces. This space collects selected work, experiments, and shipped projects.
              </p>
            </div>

            <div className="mt-4 gap-3">
              <CalDotCom className='font-medium tracking-tight bg-[#3b3b3b] border-2 border-[#c3c3c3] px-3 h-8.5 flex items-center justify-center gap-5 rounded-full hover:bg-[#424242] drop-shadow-md drop-shadow-neutral-400'>
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
          <header className="z-20 flex shrink-0 items-center justify-between border-b border-zinc-100 bg-white/90 px-5 py-4 backdrop-blur sm:px-7">
            <div>
              <p className="text-sm font-semibold">Selected designs</p>
              <p className="text-xs text-zinc-500">{designs.length} projects</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium">
              Playground
              <ArrowUpRight className="size-3.5" />
            </span>
          </header>

          {designs.length ? (
            <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="columns-1 gap-3 p-2 sm:columns-2">
                {designs.map((design) => (
                  <div key={design.id} className="mb-2.5 break-inside-avoid border border-neutral-200 rounded-[24px]">
                    <ViewDesignModal design={design}>
                      <button
                        type="button"
                        className="group relative block w-full overflow-hidden rounded-[24px] bg-zinc-100 text-left"
                      >
                        <Image
                          width={0}
                          height={0}
                          src={design.url}
                          alt={design.title}
                          className="block h-auto w-full transition duration-500 group-hover:scale-[1.025]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-80 transition group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                          <div className="min-w-0">
                            <h2 className="truncate text-lg font-medium sm:text-xl tracking-tight">{design.title}</h2>
                            {design.description && (
                              <p className="mt-1 line-clamp-2 max-w-xl text-xs leading-5 text-white/75 sm:text-sm">{design.description}</p>
                            )}
                          </div>
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950">
                            <ArrowUpRight className="size-4" />
                          </span>
                        </div>
                      </button>
                    </ViewDesignModal>
                  </div>
                ))}
              </div>
            </div>
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
