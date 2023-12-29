import PropTypes from "prop-types";
const TabComponent = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`text-lg font-semibold text-primary focus:outline-none ${activeTab === "notification" ? "border-b-2 border-primary" : ""}`}
        onClick={() => onTabChange("notification")}
      >
        Notification
      </button>
      <button
        className={`text-lg font-semibold text-primary focus:outline-none ${activeTab === "payment" ? "border-b-2 border-primary" : ""}`}
        onClick={() => onTabChange("payment")}
      >
        Payment
      </button>
    </div>
  );
};

TabComponent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
export default TabComponent;
