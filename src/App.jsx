import Banner from "./components/LandingPage/Banner";
import Category from "./components/LandingPage/Category";
import Course from "./components/LandingPage/Course";
import FAQ from "./components/LandingPage/FAQ";
import Footer from "./components/LandingPage/Footer";
import Navbar from "./components/LandingPage/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <Category/>
      <Course />
      <Footer />
      <FAQ />
    </>
  );
}

export default App;
