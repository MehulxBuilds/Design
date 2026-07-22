import Link from "next/link"
import { CtaButton } from "./cta-button";
import { Lightlogo } from "./logo";

const Navbar = () => {
    return (
        <div className="fixed left-1/2 top-5 z-[9999] flex min-h-[50px] w-[300px] -translate-x-1/2 translate-y-0 items-center justify-between rounded-[40px] border dark:border-[#e3e3e3] border-[#4b4b4b] bg-[#2C2C2C] px-3 py-[2px] duration-200 md:w-[900px] md:rounded-[10px] md:pl-5 md:pr-1">
            <div className='flex items-center justify-center gap-1'>
                <Lightlogo height={38} weight={38} />
                <h1 className='font-[600] tracking-[-0.5px] text-[18px] text-white'>Nox</h1>
            </div>
            <div className='hidden md:flex justify-center items-center gap-7 font-sans text-[13px] font-semibold dark:text-[#6A6A6A] text-white tracking-[-0.5px]'>
                <Link href={'#about'}>About</Link>
                <Link href={'#blogs'}>Testimonial</Link>
                <Link href={'#blogs'}>Services</Link>
                <Link href={'#services'}>FAQ</Link>
                <Link href={'#contact'}>Contact</Link>
            </div>
            <CtaButton label="Get Started!" variant="dark" icon="arrow" className="hidden w-[140px] md:flex" />
        </div>
    )
}

export default Navbar;