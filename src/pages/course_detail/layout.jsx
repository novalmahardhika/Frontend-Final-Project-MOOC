import Navbar_User from "@/components/navbar_user";
import PropTypes from "prop-types";
import CourseHeader from "./course_header";
// import { VideoProvider } from "./VideoContext"; // Import the VideoProvider
import Module from "./module";

const Layout = ({ children }) => {
  return (
    // <VideoProvider>
    <div className="font-poppins overflow-x-hidden">
      {/* Main Content */}
      <Navbar_User />
      <div className="bg-secondary relative h-56">
        <CourseHeader />
      </div>

      {/* Render the Module component */}
      <Module />

      <div className="">
        <div className="">{children}</div>
      </div>
    </div>
    // </VideoProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
