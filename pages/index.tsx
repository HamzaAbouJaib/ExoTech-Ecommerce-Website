import LandingPage from "@/components/LandingPage";
import Navigation from "@/components/Navigation";
import TodaysDeals from "@/components/TodaysDeals";

export default function Home() {
  return (
    <>
      <Navigation />
      <LandingPage />
      <div className="w-[80%] m-auto">
        <TodaysDeals />
      </div>
    </>
  );
}
