import React from 'react'
import ServiceStepBento from './service-step-bento';
import { HugeiconsIcon } from '@hugeicons/react';
import { FireIcon } from '@hugeicons/core-free-icons';

const ServiceSteps = () => {
    return (
        <section id="about" className="w-full rounded-[24px] border bg-[#FCFCFC] px-5 py-20 md:px-12">

            {/* Headings */}
            <div className='max-w-full flex items-center flex-col'>
                <div>
                    <h1 className="font-semibold leading-[1.08] tracking-[-4px] text-[#454545] md:text-[46px] flex flex-col gap-1 items-center">
                        Steps to Get Your Calls Booked
                        <br />
                        <div className="flex items-center font-helvetica justify-between gap-0">
                            <p className="text-cta-primary font-bubbledot tracking-[-2px]">Simple And Effective</p>
                        </div>
                    </h1>

                    <div className="font-medium leading-[1.45] tracking-normal text-[#626262] md:text-[14px] flex flex-col gap-1 items-center">
                        <p className="mt-4">
                            Every booked call deserves to happen.
                        </p>
                        <p>
                            Smart reminders reduce ghostings and last-minute cancellations.
                        </p>
                    </div>
                </div>
            </div>

            {/* Service Step Bento */}
            <ServiceStepBento />

            <div className='pt-8 w-full flex items-center justify-center text-[#5f7aff] gap-1 text-[14px] font-medium tracking-[-0.2px]'>
                <HugeiconsIcon icon={FireIcon} fill='#5f7aff' strokeWidth={2} className="size-4" />
                <span>Simple Steps to Follow</span>
            </div>

        </section>
    )
}

export default ServiceSteps;