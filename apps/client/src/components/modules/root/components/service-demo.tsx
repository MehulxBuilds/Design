"use client";

import { FireIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react'

const ServiceDemo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlayback = () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    return (
        <section id="about" className="w-full rounded-[24px] border bg-[#FCFCFC] px-5 py-20 md:px-12">

            {/* Headings */}
            <div className='max-w-full'>
                <h1 className="w-full font-semibold leading-[1.08] tracking-[-4px] text-[#454545] md:text-[46px]">
                    Simple demo to you need
                    <br />
                    <div className="flex items-center font-helvetica justify-between gap-0">
                        <p className="text-cta-primary font-bubbledot tracking-[-2px]">Simpler And Easier</p>
                    </div>
                </h1>

                <div className="font-medium leading-[1.45] tracking-normal text-[#626262] md:text-[14px]">
                    <p className="mt-4">
                        Every booked call deserves to happen.
                    </p>
                    <p>
                        Smart reminders reduce ghostings and last-minute cancellations.
                    </p>
                </div>
            </div>

            {/* Demo Service */}
            <div className='max-w-full mt-12'>
                <div className='w-full rounded-[36px] border border-[#dfdfdf] bg-[#f6f6f6] p-3.5 relative'>
                    <video
                        ref={videoRef}
                        src="/video/demo.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full rounded-[30px] border border-[#ececec] bg-[#f9f9f9]"
                    />

                    {/* Mute/Unmute */}
                    <button
                        onClick={toggleMute}
                        className="absolute right-10 bottom-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/80"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    {/* Play/Unplay */}
                    <button
                        onClick={togglePlayback}
                        className="absolute left-[50%] top-[50%] flex h-14 w-14 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/80"
                    >
                        {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                    </button>
                </div>

                <div className='pt-8 w-full flex items-center justify-center text-[#5f7aff] gap-1 text-[14px] font-medium tracking-[-0.2px]'>
                    <HugeiconsIcon icon={FireIcon} fill='#5f7aff' strokeWidth={2} className="size-4" />
                    <span>Get paid for getting ghosted!</span>
                </div>
            </div>
        </section>
    )
}

export default ServiceDemo;