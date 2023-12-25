// TabCourse.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

const TabCourse = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("All Course");

  const handleTabClick = (tabName, value) => {
    setActiveTab(tabName);
    onTabChange(value); // Pass the value to the parent component
  };

  // Jika tidak ada tab yang aktif, set active ke "All Course"
  if (!activeTab) {
    setActiveTab("All Course");
  }

  return (
    <div className="container">
      <div className="mb-3">
        <div className="flex justify-start">
          <TabButton
            tabName="All Course"
            value="All Course"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          <TabButton
            tabName="Beginner"
            value="beginner"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          <TabButton
            tabName="Intermediate"
            value="intermediate"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          <TabButton
            tabName="Advance"
            value="advance"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
        </div>
      </div>
    </div>
  );
};

TabCourse.propTypes = {
  onTabChange: PropTypes.func.isRequired,
};

const TabButton = ({ tabName, value, activeTab, onClick }) => {
  const isActive = activeTab === tabName || (!activeTab && tabName === "All Course");

  return (
    <div className={`m-2 flex flex-col items-center`}>
      <Button
        className={`bg-secondary text-black text-sm hover:text-white ${isActive ? "bg-primary text-white" : ""}`}
        onClick={() => onClick(tabName, value)} // Pass both tabName and value to the parent component
      >
        {tabName}
      </Button>
    </div>
  );
};

TabButton.propTypes = {
  tabName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TabCourse;
