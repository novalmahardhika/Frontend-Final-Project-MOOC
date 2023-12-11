import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className=" overflow-hidden h-screen font-poppins justify-between items-center">
      {/* Main Content */}
      <div className="bg-secondary h-[150px]">
        <div className="container pt-8 pb-4 space-y-3">
          <div className="flex justify-center text-2xl font-semibold text-primary">Checkout Kelas </div>
          <span className="flex  mx-auto text-center w-2/6 text-sm">Bergabung dengan kami di kelas Premium dan membangun sebuah real-world project</span>
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
