import FAQ from "./FAQ";
import Footer from "./Footer";
import Banner from "./banner";
import Category from "./category";
import Course from "./course";
import TabCourse from "./tabCourse";

const Beranda = () => {
  return (
    <div className="w-screen">
      <Banner />
      <Category />
      <TabCourse />
      <Course />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Beranda;
