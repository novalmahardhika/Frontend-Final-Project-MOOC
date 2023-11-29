import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="flex  h-screen font-poppins justify-between items-center overflow-hidden">
      {/* Main Content */}
      <div className="">
        <div className="mx-auto overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
