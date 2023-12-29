import { useState } from "react";
import TabCourse from "./tab";
import MyCourse from "./courses";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("All Course");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      {/* <div className="hidden md:flex bg-secondary h-20 "></div> */}
      <div className="relative z-1 font-poppins">
        <div className="bg-secondary">
          <div className="container pb-3 md:pb-16 pt-8 md:pt-10">
            <div className="text-xl md:text-3xl font-semibold text-primary md:ps-2">Kelas Saya</div>
          </div>
        </div>
        <div className="container space-y-3">
          <TabCourse onTabChange={handleTabChange} />
          <MyCourse activeTab={activeTab} />
        </div>
      </div>
    </>
  );
};

export default MyCourses;
