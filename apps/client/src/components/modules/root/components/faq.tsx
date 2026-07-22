import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight02Icon, BadgeQuestionMarkIcon } from "@hugeicons/core-free-icons";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "../data";
import { CtaButton } from "../components/cta-button";

const Faq = () => {
    return (
        <section id="faq" className="flex w-full justify-center px-6 py-24 border rounded-[20px] relative">

            <div className="grid w-full max-w-[1210px] gap-12 md:grid-cols-[0.9fr_1fr] md:items-start">
                <div>
                    <div className='pb-4 w-full flex items-center text-[#5f7aff] gap-1 text-[14px] font-medium tracking-[-0.2px]'>
                        <HugeiconsIcon icon={ArrowUpRight02Icon} fill="#5f7aff" strokeWidth={2} className="size-[18px]" />
                        <span>Get Your Answers Fast!</span>
                    </div>
                    <h1 className="w-full font-semibold leading-[1.08] tracking-[-4px] text-[#454545] md:text-[46px]">
                        Everything you need
                        <br />
                        <div className="flex items-center font-helvetica justify-between gap-0">
                            <p className="text-cta-primary font-bubbledot tracking-[-2px]">To Evaluate Nox</p>
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
                    <CtaButton label="Start Onboarding" icon="arrow" className="mt-8" />
                </div>

                <Accordion type="single" collapsible className="border-0 bg-transparent">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.question} value={faq.question} className="border-0 bg-transparent px-2">
                            <AccordionTrigger className="px-0 py-6 font-medium tracking-[-0.8px] leading-[1.35] text-[#454545] hover:no-underline text-[18px]">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="max-w-[610px] px-0 pb-6 text-[14.5px] leading-[1.6] text-[#475569]">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default Faq;
