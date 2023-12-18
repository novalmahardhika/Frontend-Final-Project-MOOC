import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const Filter_Kelas_saya = () => {
  return (
    <>
      <div className="flex justify-between relative bg-secondary font-poppins font-medium right-0 h-full w-screen overflow-hidden">
        <div className="container-kelas ">
          <div className="w-[267px] h-[500px] border-3 border-black bg-white ml-[150px] rounded-lg">
            <p className="flex items-center ml-5 p-3 font-bold text-lg">
              Filter
            </p>
            <div className="flex flex-col ml-3 space-y-3">
              <div className="flex items-center ml-5 space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm font-medium">
                  Paling Baru
                </label>
              </div>
              <div className="flex items-center ml-5 space-x-2">
                <Checkbox id="popular" />
                <label
                  htmlFor="popular"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Paling Populer
                </label>
              </div>

              <div className="flex items-center ml-5 space-x-2">
                <Checkbox id="promo" />
                <label
                  htmlFor="promo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Promo
                </label>
              </div>
            </div>
            {/* category 2 */}
            <div className="flex flex-col ml-3 space-y-3 mt-5">
              <p className="flex items-center ml-4 p-1 font-bold text-lg">
                Kategori
              </p>
              <div className="flex items-center ml-5 space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm font-medium">
                  UI/UX design
                </label>
              </div>
              <div className="flex items-center ml-5 space-x-2">
                <Checkbox id="popular" />
                <label
                  htmlFor="popular"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Paling Populer
                </label>
              </div>
              <div className="flex items-center ml-5 space-x-2">
                <Checkbox id="promo" />
                <label
                  htmlFor="promo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Promo
                </label>
              </div>
            </div>
            {/* card 3 */}
            <div className="flex flex-col ml-7  mt-5">
              <p className="flex items-center p-1 font-bold text-lg mb-0 ">
                level Kesulitan
              </p>
              <div className="flex items-center ml-1 space-x-2 mb-3">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm font-medium">
                  Paling Baru
                </label>
              </div>
              <div className="flex items-center ml-1  space-x-2 mb-3">
                <Checkbox id="popular" />
                <label
                  htmlFor="popular"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Paling Populer
                </label>
              </div>
              <div className="flex items-center ml-1  space-x-2 mb-2">
                <Checkbox id="promo" />
                <label
                  htmlFor="promo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Promo
                </label>
              </div>
              <Button className="w-[150px] mt-5 ml-5">Hapus Filter</Button>
            </div>
          </div>
        </div>
        <div className="flex  flex-col  items-center w-screen">
          <div className="flex space-x-5 ">
            <Button className="w-[125px] h-[40px] bg-white text-black hover:bg-active">
              All
            </Button>
            <Button className="w-[280px] h-[40px]">in Progress</Button>
            <Button className="w-[230px] h-[40px] bg-white text-black hover:bg-active">
              Selesai
            </Button>
          </div>
          <div className="grid grid-cols-1 grid-rows-2">
            <div className="flex flex-wrap ">
              <div className="w-[400px] h-[300px] flex flex-col mx-10 mt-5 bg-white">
                <img src="../../../src/assets/image (1).png" alt="" />
                <div className="flex items-center justify-between mt-3">
                  <h1 className="text-primary text-lg font-bold ml-3">
                    UI/UX Design
                  </h1>
                  <div className="flex items-center justify-self-end mr-4">
                    <img src="../../../src/assets/Vector (1).png" alt="" />
                    <p className="ml-2 text-lg font-bold">4.8</p>
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
                  <img src="../../../src/assets/clarity_book-line.png" alt="" />
                  <p className="ml-1 text-md mr-3 font-medium">5 Modul</p>
                  <img src="../../../src/assets/jam.png" alt="" />
                  <p className="ml-1 text-md font-medium">60 Menit</p>
                </div>
                <div className="flex items-center justify-items-end">
                  <img
                    src="../../../src/assets/success.png"
                    alt=""
                    className="mt-5  mr-2 ml-3"
                  />
                  <Progress className="h-[20px] w-[250px] mt-5" value={60} />
                </div>
              </div>

              <div className="w-[400px] h-[300px] flex flex-col mt-5 bg-white">
                <img src="../../../src/assets/image (1).png" alt="" />
                <div className="flex items-center justify-between mt-3">
                  <h1 className="text-primary text-lg font-bold ml-3">
                    UI/UX Design
                  </h1>
                  <div className="flex items-center justify-self-end mr-4">
                    <img src="../../../src/assets/Vector (1).png" alt="" />
                    <p className="ml-2 text-lg font-bold">4.8</p>
                  </div>
                </div>
                <div>
                  <h1 className="ml-3 font-bold text-md mt-1">
                    Membuat Wireframe Hingga ke Visual Design
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
                  <img src="../../../src/assets/clarity_book-line.png" alt="" />
                  <p className="ml-1 text-md mr-3 font-medium">5 Modul</p>
                  <img src="../../../src/assets/jam.png" alt="" />
                  <p className="ml-1 text-md font-medium">60 Menit</p>
                </div>
                <div className="flex items-center justify-items-end">
                  <img
                    src="../../../src/assets/success.png"
                    alt=""
                    className="mt-5  mr-2 ml-3"
                  />
                  <Progress className="h-[20px] w-[250px] mt-5" value={10} />
                </div>
              </div>

              <div className="w-[400px] h-[300px] flex flex-col mt-5 ml-[40px] bg-white">
                <img src="../../../src/assets/image (3).png" alt="" />
                <div className="flex items-center justify-between mt-3">
                  <h1 className="text-primary text-lg font-bold ml-3">
                    Data Science
                  </h1>
                  <div className="flex items-center justify-self-end mr-4">
                    <img src="../../../src/assets/Vector (1).png" alt="" />
                    <p className="ml-2 text-lg font-bold">4.8</p>
                  </div>
                </div>
                <div>
                  <h1 className="ml-3 font-bold text-md mt-1">
                    Dasar pemograman Phyton
                  </h1>
                  <h1 className="ml-3 font-medium text-sm mt-1">
                    by James Doe
                  </h1>
                </div>
                <div className="flex items-center ml-3 mt-2">
                  <img src="../../../src/assets/inter.png" alt="" />
                  <p className="ml-1 text-md mr-2 font-medium">
                    Intermediate Level
                  </p>
                  <img src="../../../src/assets/clarity_book-line.png" alt="" />
                  <p className="ml-1 text-md mr-3 font-medium">5 Modul</p>
                  <img src="../../../src/assets/jam.png" alt="" />
                  <p className="ml-1 text-md font-medium">60 Menit</p>
                </div>
                <div className="flex items-center justify-items-end">
                  <img
                    src="../../../src/assets/success.png"
                    alt=""
                    className="mt-5  mr-2 ml-3"
                  />
                  <Progress className="h-[20px] w-[250px] mt-5" value={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter_Kelas_saya;
