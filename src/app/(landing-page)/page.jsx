import AboutSection from "./_components/aboutSection";
import FooterSection from "./_components/footerSection";
import HeroSection from "./_components/heroSection";
import Navbar from "./_components/navbarSection";

export default function page() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <FooterSection />
        </>
    )
}