import { Button } from "@/components/ui/button";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Banner_Profile = () => {
  return (
    <>
      <div className="relative bg-secondary font-poppins font-medium right-0 h-full w-screen overflow-hidden">
        <div className="flex   ">
          <div className="flex items-center justify-start ml-[225px] h-[120px] w-screen relative">
            <div className="flex items-center justify-end">
              <Button>
                <FontAwesomeIcon icon={faArrowLeft} />
                <p className="ml-2">Kembali Ke Beranda</p>
              </Button>
            </div>
          </div>
              </div>
              </div>
    </>
  );
};

export default Banner_Profile;
