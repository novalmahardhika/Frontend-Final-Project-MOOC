import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  faCartShopping,
  faGear,
  faPencil,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ubah_Password = () => {
  return (
    <>
      <div className="flex ml-[400px] bg-white h-[450px] w-[700px] rounded-md outline outline-offset-0 outline-1 justify-center mb-[100px] ">
        <div className="flex container-form bg-primary w-full h-[62px] rounded-t-md  justify-between">
          <div className="mt-[100px]  ml-4 ">
            <Button className="bg-transparent text-primary text-lg flex items-center justify-start rounded-none w-[250px] border-b border-primary border-opacity-20 hover:bg-active">
              <FontAwesomeIcon icon={faPencil} />
              <p className="font-medium ml-3">Profil Saya</p>
            </Button>
            <Button className="bg-transparent mt-5 text-primary text-md flex items-center justify-start rounded-none w-[250px] border-b border-primary border-opacity-20 hover:bg-active">
              <FontAwesomeIcon icon={faGear} />
              <p className="font-bold ml-3">Ubah Password</p>
            </Button>
            <Button className="bg-transparent mt-5 text-primary text-md flex items-center justify-start rounded-none w-[250px] border-b border-primary border-opacity-20 hover:bg-active">
              <FontAwesomeIcon icon={faCartShopping} />
              <p className="font-medium ml-3">Riwayat Pembayaran</p>
            </Button>
            <Button className="bg-transparent mt-5 text-primary text-md flex items-center justify-start rounded-none w-[250px] border-b border-primary border-opacity-20 hover:bg-active">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p className="font-medium ml-3">Keluar</p>
            </Button>
          </div>
          <div className="h-[300px] w-full mt-[100px] ">
            <div className="flex items-center justify-center flex-col ">
                          <div>
                              <p className="font-bold text-2xl mb-3">Ubah Password</p>
              </div>

              <div className="grid w-[300px] max-w-sm items-center gap-1.5 mb-3">
                <label htmlFor="email">Masukan Password lama</label>
                <Input type="email" id="email" placeholder="********" />
              </div>
              <div className="grid w-[300px] max-w-sm items-center gap-1.5 mb-3">
                <label htmlFor="email">Masukan Password Baru</label>
                <Input type="email" id="email" placeholder="********" />
              </div>
              <div className="grid w-[300px] max-w-sm items-center gap-1.5 mb-3">
                <label htmlFor="email">Ulangi Password Baru</label>
                <Input type="email" id="email" placeholder="********" />
              </div>
              
              <Button className="w-[250px] text-bold text-white hover:bg-active">Ubah Password</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Ubah_Password;
