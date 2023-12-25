import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="bg-secondary font-poppins font-medium p-4 top-0 right-0 w-full z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-14 ">
          <div className="text-primary text-2xl font-bold">Hi, Admin! </div>
          {/* <div className="flex space-x-4 relative">
            <div>
              <Input
                type="text"
                placeholder="cari"
                className="bg-white h-12 w-72"
              ></Input>
            </div>
            <div className="absolute right-3 flex items-center bg-primary text-white my-2 w-10 h-8 justify-center rounded-sm cursor-pointer">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
