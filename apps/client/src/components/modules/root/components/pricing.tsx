"use client";

import { Award01Icon, DotFreeIcons, FireIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react'
import DemoWalletModal from './demo-wallet-modal';

export const Pricingbenefits = [
    "More Booked Calls",
    "Pre-Qualified Leads",
    "Higher Conversion Rates",
    "Save Hours Every Week",
    "Automated Scheduling",
    "24/7 Appointment Booking",
    "Increase Revenue",
    "No More Calendar Chaos",
];

const Pricing = () => {

    return (
        <section className="w-full rounded-[24px] border bg-[#FCFCFC] px-5 py-20 md:px-12">

            <div className='max-w-full flex items-start justify-center gap-40'>
                {/* Pricing Benefits */}
                <div>
                    <h1 className="w-full font-semibold leading-[1.08] tracking-[-4px] text-[#454545] md:text-[46px]">
                        Add Money Seamlessly
                        <br />
                        <div className="flex items-center font-helvetica justify-between gap-0">
                            <p className="text-cta-primary font-bubbledot tracking-[-2px]">Credit And Withdraw</p>
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

                    <div className="mt-8 flex flex-col">
                        {/* Pricing Benefits */}
                        {Pricingbenefits.map((benefit, index) => (
                            <div key={index} className="flex items-center">
                                <HugeiconsIcon icon={DotFreeIcons} className="h-10 w-10 text-[#5f7aff]" />
                                <p className="font-medium tracking-normal text-[#626262] md:text-[14px]">{benefit}</p>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Demo Wallet Modal */}
                <div className='flex items-start flex-col gap-4'>
                    <DemoWalletModal />
                    <div className='pt-8 w-full flex items-center justify-center text-[#5f7aff] gap-1 text-[14px] font-medium tracking-[-0.2px]'>
                        <HugeiconsIcon icon={FireIcon} fill='#5f7aff' strokeWidth={2} className="size-4" />
                        <span>Credit & Withdraw Seamlessly</span>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default Pricing;