import Navbar from "./_components/navbarSection";
import HeroSection from "./_components/heroSection";
import AboutSection from "./_components/aboutSection";
import JoinSection from "./_components/joinSection";
import FooterSection from "./_components/footerSection";

export default function page() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <JoinSection />
            <FooterSection />
        </>
    )
}