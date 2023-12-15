import PropTypes from "prop-types";
import Navbar_User from "@/components/navbar_user";

const Layout = ({ children }) => {
  return (
    <div className=" overflow-hidden font-poppins top-0 ">
      {/* Main Content */}
      <div className="z-10">
        <Navbar_User />
      </div>

      <div className="">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
