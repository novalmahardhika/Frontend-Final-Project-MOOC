import Navbar_User from "@/components/navbar_user";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="h-screen font-poppins justify-between items-center">
      {/* Main Content */}
      <Navbar_User />
      <div className="container md:m-5 mb-5">
        <div className=" text-3xl font-semibold text-primary">Cari Kelas</div>
        <div className=" text-3xl font-semibold text-primary">Sesuai Karir Kamu</div>
      </div>

      <div className="">
        <div className="container justify-between ">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
