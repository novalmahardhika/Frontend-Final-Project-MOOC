import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Kelas_premium = () => {
  return (
    <>
      <div className="flex justify-between relative bg-secondary font-poppins font-medium right-0 h-full w-screen overflow-hidden">
        <div className="container-kelas">
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
                  Semua Level
                </label>
              </div>
              <div className="flex items-center ml-1 space-x-2 mb-3">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm font-medium">
                  Beginner Level
                </label>
              </div>
              <div className="flex items-center ml-1  space-x-2 mb-3">
                <Checkbox id="popular" />
                <label
                  htmlFor="popular"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Intermediate Level
                </label>
              </div>
              <div className="flex items-center ml-1  space-x-2 mb-2">
                <Checkbox id="promo" />
                <label
                  htmlFor="promo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Advanced level
                </label>
              </div>
              <Button className="w-[150px] mt-3 ml-5">Hapus Filter</Button>
            </div>
          </div>
        </div>
        <div className="flex  flex-col  items-center w-screen">
          <div className="flex space-x-5 ">
            <Button className="w-[125px] h-[40px] bg-white text-black hover:bg-active">
              All
            </Button>
            <Button className="w-[280px] h-[40px]">Kelas Premium</Button>
            <Button className="w-[230px] h-[40px] bg-white text-black hover:bg-active">
              Kelas Gratis
            </Button>
          </div>
          <div className="grid grid-cols-1 grid-rows-2">
            <div className="flex flex-wrap ">
              <div className="grid grid-cols-1 grid-rows-2 ">
                <div className="flex flex-wrap ">
                  <div className="w-[350px] h-[225px] flex flex-col ml-[200px] mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-4 mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Membuat Wireframe Hingga ke Visual Design
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-[200px] mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Membuat Wireframe Hingga ke Visual Design
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-4 mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-[200px] mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-4 mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-[200px] mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-4 mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-[200px] mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-4 mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-[200px] mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-4 mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-[200px] mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[350px] h-[225px] flex flex-col ml-4 mt-5 bg-white rounded-md">
                    <img src="../../../src/assets/image (1).png" alt="" />
                    <div className="flex items-center justify-between mt-1">
                      <h1 className="text-primary text-md font-bold ml-3">
                        UI/UX Design
                      </h1>
                      <div className="flex items-center justify-self-end mr-4">
                        <img src="../../../src/assets/Vector (1).png" alt="" />
                        <p className="ml-2 text-sm font-bold">4.8</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="ml-3 font-bold text-sm mt-0">
                        Belajar Web Designer Dengan Figma
                      </h1>
                      <h1 className="ml-3 font-medium text-sm mt-1">
                        By Angela Doe
                      </h1>
                    </div>
                    <div className="flex items-center ml-3 mt-1">
                      <img src="../../../src/assets/inter.png" alt="" />
                      <p className="ml-1 text-xs mr-2 font-medium">
                        Intermediate Level
                      </p>
                      <img
                        src="../../../src/assets/clarity_book-line.png"
                        alt=""
                      />
                      <p className="ml-1 text-xs mr-3 font-medium">5 Modul</p>
                      <img src="../../../src/assets/jam.png" alt="" />
                      <p className="ml-1 text-xs font-medium">60 Menit</p>
                    </div>
                    <div className="mt-2 ml-4">
                      <Button className="h-[25px] hover:bg-active">
                        <img src="../../../src/assets/premium.png" alt="" />
                        <p className="ml-2 text-md font-medium">Premium</p>
                      </Button>
                    </div>
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
export default Kelas_premium;
