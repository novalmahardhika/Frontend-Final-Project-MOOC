import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  faCartShopping,
  faGear,
  faPencil,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Riwayat_Pembayaran = () => {
  return (
    <>
      <div className="flex ml-[400px] bg-white h-[737px] w-[900px] rounded-md outline outline-offset-0 outline-1 justify-center mb-[100px] ">
        <div className="flex container-form bg-primary w-full h-[62px] rounded-t-md  justify-between">
          <div className="mt-[100px]  ml-4 ">
            <Button className="bg-transparent text-primary text-lg flex items-center justify-start rounded-none w-[250px] border-b border-primary border-opacity-20 hover:bg-active">
              <FontAwesomeIcon icon={faPencil} />
              <p className="font-medium ml-3">Profil Saya</p>
            </Button>
            <Button className="bg-transparent mt-5 text-primary text-md flex items-center justify-start rounded-none w-[250px] border-b border-primary border-opacity-20 hover:bg-active">
              <FontAwesomeIcon icon={faGear} />
              <p className="font-medium ml-3">Ubah Password</p>
            </Button>
            <Button className="bg-transparent mt-5 text-primary text-lg flex items-center justify-start rounded-none w-[250px] border-b border-primary border-opacity-20 hover:bg-active">
              <FontAwesomeIcon icon={faCartShopping} />
              <p className="font-bold ml-3 ">Riwayat Pembayaran</p>
            </Button>
            <Button className="bg-transparent mt-5 text-primary text-md flex items-center justify-start rounded-none w-[250px] border-b border-primary border-opacity-20 hover:bg-active">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p className="font-medium ml-3">Keluar</p>
            </Button>
          </div>
          <div className="h-[300px] w-full mt-[100px] ">
            <div className="flex items-center justify-center flex-col ">
              <div>
                <p className="font-bold text-2xl mb-4">Riwayat Pembayaran</p>
              </div>
              <div className="w-[400px] h-[280px] rounded-sm shadow-md bg-white flex flex-col mr-4">
                <div className="w-[400px] h-full flex flex-col">
                  <img src="../../../src/assets/image (1).png" alt="" />
                  <div className="flex items-center justify-between mt-3">
                    <h1 className="text-primary text-lg font-bold ml-3">
                      UI/UX Design
                    </h1>
                    <div className="flex items-center justify-self-end mr-4">
                      <img src="../../../src/assets/Vector (1).png" alt="" />
                      <p className="ml-2 tex-lg font-bold">4.8</p>
                    </div>
                  </div>
                  <div>
                    <h1 className="ml-3 font-bold text-md mt-1">
                      Belajar Web Designer Dengan Figma
                    </h1>
                    <h1 className="ml-3 font-medium text-sm mt-1">
                      By Angela Doe
                    </h1>
                  </div>
                  <div className="flex items-center ml-3 mt-2">
                    <img src="../../../src/assets/inter.png" alt="" />
                    <p className="ml-1 text-md mr-2 font-medium">
                      Intermediate Level
                    </p>
                    <img
                      src="../../../src/assets/clarity_book-line.png"
                      alt=""
                    />
                    <p className="ml-1 text-md mr-3 font-medium">5 Modul</p>
                    <img src="../../../src/assets/jam.png" alt="" />
                    <p className="ml-1 text-md font-medium">60 Menit</p>
                  </div>
                  <div className="flex items-center justify-items-end">
                    <Button className="bg-red-500 hover:bg-active ml-5 mt-3">
                      <img
                        src="../../../src/assets/diamond.png"
                        alt=""
                        className="mr-0 w-30"
                      />
                      <div className="ml-3 text-lg font-medium">
                        Waiting For Payment
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-[400px] h-[280px] rounded-sm shadow-md bg-white flex flex-col mr-4 mt-3">
                <div className="w-[400px] h-full flex flex-col ">
                  <img src="../../../src/assets/image (1).png" alt="" />
                  <div className="flex items-center justify-between mt-3">
                    <h1 className="text-primary text-lg font-bold ml-3">
                      UI/UX Design
                    </h1>
                    <div className="flex items-center justify-self-end mr-4">
                      <img src="../../../src/assets/Vector (1).png" alt="" />
                      <p className="ml-2 tex-lg font-bold">4.8</p>
                    </div>
                  </div>
                  <div>
                    <h1 className="ml-3 font-bold text-md mt-1">
                      Belajar Web Designer Dengan Figma
                    </h1>
                    <h1 className="ml-3 font-medium text-sm mt-1">
                      By Angela Doe
                    </h1>
                  </div>
                  <div className="flex items-center ml-3 mt-2">
                    <img src="../../../src/assets/inter.png" alt="" />
                    <p className="ml-1 text-md mr-2 font-medium">
                      Intermediate Level
                    </p>
                    <img
                      src="../../../src/assets/clarity_book-line.png"
                      alt=""
                    />
                    <p className="ml-1 text-md mr-3 font-medium">5 Modul</p>
                    <img src="../../../src/assets/jam.png" alt="" />
                    <p className="ml-1 text-md font-medium">60 Menit</p>
                  </div>
                  <div className="flex items-center justify-items-end">
                    <Button className="bg-success hover:bg-active ml-5 mt-3">
                      <img
                        src="../../../src/assets/diamond.png"
                        alt=""
                        className="mr-0 w-30"
                      />
                      <div className="ml-3 text-lg font-medium">
                        Paid
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Riwayat_Pembayaran;
