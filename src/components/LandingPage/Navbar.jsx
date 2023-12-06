import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="bg-primary font-poppins font-medium p-4 top-0 h-[100px] right-0 w-screen z-10 sm-w- md-w-max lg-w-max">
      <div className="mx-16">
        <div className="flex items-center justify-between h-14 mx-auto mt-2">
          <div className="w-32 ">
            <img src="/src/assets/logo.png" />
          </div>
          <div className="mx-auto">
            <div className="flex items-center relative">
              <div className="relative my-2">
                <div className="">
                  <div className="text-white absolute top-0 right-0 mt-2 mr-4 z-10 text-white my-2 w-10 h-8 justify-center rounded-sm cursor-pointer   ">
                    <Button>
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </div>
                  <Input
                    type="text"
                    placeholder="cari kursus terbaik"
                    className="bg-white h-12 w-80"
                  ></Input>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-self-end flex flex-row ">
            <img
              src="/src/assets/fi_log-in.png"
              alt=""
              className="w-full h-full mt-2 mr-0"
            />
            <Button className="text-lg">Masuk</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
