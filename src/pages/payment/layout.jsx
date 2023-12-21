import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="h-screen font-poppins items-center">
      {/* Main Content */}

      <div className="">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
