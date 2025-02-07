import { useEffect } from "react";
import Header from "../components/Header";
import Faq from "../components/Faq";
import Sectionthree from "../components/Sectionthree";
import Footer from "../components/Footer";
import FirstPartForeign from "../components/FirstPartForeign";
import SuggestionsForeign from "../components/SuggestionsForeign";
import BusyRoutesForeign from "../components/BusyRoutesForeign";
import SectionForeign from "../components/SectionForeign";

const Foreign = () => {
  useEffect(() => {
    document.title = "پرنت | پروازهای خارجی";
  }, []);

  return (
    <div className="relative">
      <Header />
      <div className="pb-40">
        <img
          src="./src/assets/images/homeImages/spain-airplane.jpg"
          className="w-full h-[450px] object-cover rounded-b-[3rem]"
        />
      </div>
      <FirstPartForeign />
      <SuggestionsForeign />
      <BusyRoutesForeign />
      <SectionForeign />
      <Faq />
      <Sectionthree />
      <Footer />
    </div>
  );
};

export default Foreign;
