import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className=" overflow-hidden h-screen font-poppins justify-between items-center">
      {/* Main Content */}
      <div className="bg-secondary">
        <div className="container pt-12 pb-20">
          <div className=" text-3xl font-semibold text-primary">Notification </div>
        </div>
      </div>
      <div className="">
        <div className="container ">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
