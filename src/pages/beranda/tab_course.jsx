import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TabCourse = ({ onTabChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  const handleTabClick = (tabName, value) => {
    let updatedActiveTab = "All";

    if (activeTab === tabName) {
      // If the clicked tab is already active, deactivate it
      updatedActiveTab = "All";
    } else {
      // If the clicked tab is not active, activate it
      updatedActiveTab = tabName;
    }

    // Update the URL with the selected tab value
    const newSearchParams = new URLSearchParams();

    // If the selected tab is not "All", set the category parameter
    if (updatedActiveTab !== "All") {
      newSearchParams.set("category", encodeURIComponent(value));
    }

    // Add other parameters from the original search
    searchParams.forEach((val, key) => {
      if (key !== "category") {
        newSearchParams.set(key, val);
      }
    });

    // Replace the current URL with the updated search parameters
    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
    });

    // Set the active tab after updating the URL
    setActiveTab(updatedActiveTab);
  };

  return (
    <div className="container ">
      <div className="font-poppins space-y-6">
        <div className="flex items-center justify-between pt-10">
          <h1 className="font-bold md:text-xl">Kursus Populer</h1>
          <Link to="/courses">
            <Button className="text-xs h-6 md:h-8 hover:bg-active">Lihat Semua</Button>
          </Link>
        </div>
        <div className="mb-3 overflow-x-scroll md:overflow-hidden">
          <div className="flex justify-start pb-5 md:pb-0 ">
            <TabButton
              tabName="Data Science"
              value="Data Science"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
            <TabButton
              tabName="UI/UX Design"
              value="UI/UX Design"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
            <TabButton
              tabName="Android Development"
              value="Android Development"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
            <TabButton
              tabName="Web Development"
              value="Web Development"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
            <TabButton
              tabName="IOS Development"
              value="IOS Development"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
            <TabButton
              tabName="Business Intelligence"
              value="Business Intelligence"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TabCourse.propTypes = {
  onTabChange: PropTypes.func.isRequired,
};

const TabButton = ({ tabName, value, activeTab, onClick }) => {
  const isActive = activeTab === tabName;

  return (
    <div className={`m-2 flex flex-col items-center`}>
      <Button
        className={`bg-secondary text-black text-sm hover:text-white ${isActive ? "bg-primary text-white" : ""}`}
        onClick={() => onClick(tabName, value)}
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
