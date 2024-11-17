
import Hero1 from "@/components/landing_page/Hero1";
import MessageSlider from "@/components/landing_page/MessageSlider";
import Topnav from "@/components/landing_page/Topnav";
import TruefeebackLogo from "@/components/landing_page/TruefeebackLogo";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full relative bg-[url('/lading_page_bg.jpg)'] h-screen">
      <img src={'/landing_page_bg.jpg'} className="fixed top-0 left-0 bottom-0 w-full h-full -z-20" alt="bg image" />

      <div className=" fixed top-0 left-0 bottom-0 -z-10 bg-[url('/lading_page_bg.jpg)']   inset-0 bg-slate-900/30 backdrop-blur-md ">
      </div>

      <div className="absolute z-10 top-0 h-full">

        {/* top nav */}
        <Topnav />

        {/* hero section */}
        <Hero1 />

        <div className="w-full h-2/3 -mt-40 flex items-center justify-center">
          <MessageSlider />
        </div>
      </div>

    </div>
  );
}
