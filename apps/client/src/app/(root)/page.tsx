import Landing from "@/components/modules/root/components/landing";
import Footer from "@/components/modules/root/components/footer";
import Navbar from "@/components/modules/root/components/navbar";
import ServiceDemo from "@/components/modules/root/components/service-demo";
import Faq from "@/components/modules/root/components/faq";
import ServiceSteps from "@/components/modules/root/components/service-steps";
import Pricing from "@/components/modules/root/components/pricing";

const Home = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <Navbar />
      <Landing />
      <ServiceDemo />
      <ServiceSteps /> {/* How it works */}
      <Pricing /> {/* Pricing */}
      <Faq />
      <Footer />
    </main>
  )
};

export default Home;