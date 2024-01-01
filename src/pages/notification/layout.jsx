import PropTypes from "prop-types";
import NotificationPage from "./list_notif";

const Layout = ({ children }) => {
  return (
    <div className="overflow-hidden font-poppins justify-between items-center">
      {/* Main Content */}
      <div className="bg-secondary">
        <div className="container pt-6 pb-20">
          <div className=" text-3xl font-semibold text-primary">Notification </div>
        </div>
      </div>
      <div className="container flex justify-between gap-10">
        <div className="w-[500px]">
          <NotificationPage />
        </div>

        <div className="">
          <div className=" w-[900px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
