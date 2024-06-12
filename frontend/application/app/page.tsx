import Features from "@/features/Features";
import GetApp from "@/features/GetApp";
import Guide from "@/features/Guide";
import Hero from "@/features/Hero";
import Tutor from "@/features/Tutor";

export default function Home() {
  return (
    <>
     <Hero/>
     <Tutor/>
     <Guide/>
     <Features/>
     <GetApp/>
    </>
  )
}