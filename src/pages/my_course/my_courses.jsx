import { useState } from "react";
import TabCourse from "./tab";
import MyCourse from "./courses";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("All Course");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container mt-5">
      <TabCourse onTabChange={handleTabChange} />
      <MyCourse activeTab={activeTab} />
    </div>
  );
};

export default MyCourses;
