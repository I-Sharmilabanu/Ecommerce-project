import Navbar from "../components/Navbar";
import HeroVideo from "../components/HeroVideo";
import FashionGrid from "../components/FashionGrid";
import TrustSection from "../components/TrustSection";
import OfferSection from "../components/OfferSection";
import ReviewSection from "../components/ReviewSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <HeroVideo />
      <FashionGrid />
      <TrustSection />
      <OfferSection />
      <ReviewSection />
      <Footer />
    </div>
  );
};

export default Home;
