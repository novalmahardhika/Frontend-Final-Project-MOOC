import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import Logo from "./../assets/logo.png";
import Menu from "./menu";
import AvatarProfile from "./avatar";
// import axios from "axios";

const Navbar_User = () => {
  return (
    <nav className="bg-primary font-poppins font-medium p-4 top-0 right-0 w-full z-10 sticky">
      <div className=" container mx-auto flex items-center justify-between h-12 ">
        {/* <div className=""> */}
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="mx-auto my-auto w-36"
          />
        </div>
        <div>
          <Menu />
        </div>

        <div className="flex justify-between items-center space-x-4">
          <div className="text-white text-sm"></div>
          <div className=" rounded-full bg-white w-11 h-11 flex justify-center items-center text-xl cursor-pointer hover:bg-muted-foreground">
            <FontAwesomeIcon
              icon={faSearch}
              title="search"
            />
          </div>
          <div className=" rounded-full bg-white w-11 h-11 flex justify-center items-center text-xl cursor-pointer hover:bg-muted-foreground">
            <FontAwesomeIcon
              icon={faBell}
              title="notification"
            />
          </div>

          <div>
            <AvatarProfile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_User;
