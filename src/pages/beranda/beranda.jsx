import FAQ from "./FAQ";
import Footer from "./Footer";
import Banner from "./banner";
import Category from "./category";
import Course from "./course";
import TabCourse from "./tab_course";
import { useState } from "react";

const Beranda = () => {
  const [activeTab, setActiveTab] = useState("All");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="w-screen">
      <Banner />
      <Category />
      <TabCourse onTabChange={handleTabChange} />
      <Course activeTab={activeTab} />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Beranda;
