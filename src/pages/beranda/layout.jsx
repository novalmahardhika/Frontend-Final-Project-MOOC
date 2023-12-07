import PropTypes from "prop-types";
import Navbar_User from "@/components/navbar_user";

const Layout = ({ children }) => {
  return (
    <div className="font-poppins justify-between top-0">
      {/* Main Content */}
      <div className="z-10">
        <Navbar_User />
      </div>

      <div className="">
        <div className=" overflow-hidden ">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
