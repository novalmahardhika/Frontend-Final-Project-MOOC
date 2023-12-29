import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const TabCourse = ({ onTabChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  useEffect(() => {
    const type = new URLSearchParams(location.search).get("type");
    const validTypes = ["All", "premium", "free"];
    setActiveTab(validTypes.includes(type) ? type : "All");
  }, [location.search]);

  const handleTabClick = (tabName, value) => {
    let updatedActiveTab = "All";

    if (activeTab === tabName) {
      updatedActiveTab = "All";
    } else {
      updatedActiveTab = tabName;
    }

    const newSearchParams = new URLSearchParams();

    if (updatedActiveTab !== "All") {
      newSearchParams.set("type", encodeURIComponent(value));
    }

    searchParams.forEach((val, key) => {
      if (key !== "type") {
        newSearchParams.set(key, val);
      }
    });

    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
    });

    setActiveTab(updatedActiveTab);
  };

  return (
    <div className="font-poppins space-y-6">
      <div className="mb-3 md:mb-0 overflow-x-scroll md:overflow-hidden">
        <div className="flex justify-start  md:pb-0 ">
          <TabButton
            tabName="All"
            value="All"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          <TabButton
            tabName="premium"
            value="premium"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          <TabButton
            tabName="free"
            value="free"
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
  const isActive = activeTab === tabName;

  return (
    <div className={`m-2 flex flex-col items-center`}>
      <Button
        className={`bg-secondary text-black text-sm hover:text-white ${isActive ? "bg-primary text-white" : ""}`}
        onClick={() => onClick(tabName, value)}
      >
        {value}
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
