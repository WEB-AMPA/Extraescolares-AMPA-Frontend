import Navbar from "../../components/navbar/Navbar";
import Hero from "../hero/hero";
import Footer from "../../components/footer/Footer";
import Activities from "../activities/activities";
import AboutUs from "../aboutUs/aboutUs";
import Contact from "../contact/contact";
import ModalCookies from "../../components/modalCookies/modalCookies";

function Layout() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ModalCookies />
      <AboutUs />
      <Activities />
      <Contact />
      <Footer />
    </div>
  );
}

export default Layout;
