import Hero from "../../components/Home/hero/Hero";
import BrokerSection from "../../components/Home/properties/BrokerSection";
import HeroBanner from "../../components/Home/hero/HeroBanner";
import QuerySection from "../../components/Home/query/QuerySection";
import SearchPage from "../../components/Home/searchSection/SearchPage";

function Home() {
  return (
    <>
      <Hero />

      {/* Show only on mobile & tablet, hide on desktop */}
      <div className="lg:hidden">
        <SearchPage />
      </div>

      <BrokerSection />
      <QuerySection />
    </>
  );
}

export default Home;