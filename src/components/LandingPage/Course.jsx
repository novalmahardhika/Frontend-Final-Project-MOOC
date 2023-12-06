import { Button } from "../ui/button";

const Course = () => {
  return (
    <>
      <div className="container-category bg-white w-screen h-full text-xl flex flex-col">
        <div className="font-poppins p-5 flex justify-between mt-0 mx-[90px]">
          <h1 className="font-bold ml-[40px]">Kursus Populer</h1>
          <Button className="text-sm ">Lihat Semua</Button>
        </div>
        <div className="flex justify-center ml-5 mt-0">
          <div className=" m-2 flex flex-col items-center">
            <Button className="bg-secondary text-black text-lg font-semibold">
              All
            </Button>
          </div>
          <div className="m-2 flex flex-col items-center">
            <Button className="bg-secondary text-black text-lg font-semibold">
              Data Science
            </Button>
          </div>
          <div className="m-2 flex flex-col items-center">
            <Button className="bg-primary text-white text-lg font-semibold">
              UI/UX Design
            </Button>
          </div>
          <div className="m-2 flex flex-col items-center">
            <Button className="bg-secondary text-black text-lg font-semibold">
              Android Development
            </Button>
          </div>
          <div className="  m-2 flex flex-col items-center">
            <Button className="bg-secondary text-black text-lg font-semibold">
              Web Development
            </Button>
          </div>
          <div className="m-2 flex flex-col items-center">
            <Button className="bg-secondary text-black text-lg font-semibold">
              IOS Development
            </Button>
          </div>
          <div className="m-2 flex flex-col items-center">
            <Button className="bg-secondary text-black text-lg font-semibold">
              Bussiness Intelligence
            </Button>
          </div>
        </div>

        <div className="flex mt-8 mx-auto">
          <div className="flex mt-8">
            {/* Card 1 */}
            <div className="w-[400px] h-[280px] rounded-sm shadow-md bg-white flex flex-col mr-4">
              <div>
                <img
                  src="/src/assets/image (1).png"
                  alt=""
                  className="w-full h-[100px] mt-[-10px] mb-2"
                />
              </div>
              <div className="w-[400px] h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h1 className="text-primary text-lg font-bold ml-3">
                    UI/UX Design
                  </h1>
                  <div className="flex items-center justify-self-end mr-4">
                    <img src="/src/assets/ic_round-star.png" alt="" />
                    <p className="ml-2 tex-lg font-bold">4.7</p>
                  </div>
                </div>
                <div>
                  <h1 className="ml-3 font-bold text-sm mt-4">
                    Belajar Web Designer Dengan Figma
                  </h1>
                  <h1 className="ml-3 font-semibold text-sm mt-1">
                    By Angela Doe
                  </h1>
                </div>
                <div className="flex items-center ml-3 mt-2">
                  <img src="/src/assets/Vector.png" alt="" />
                  <p className="ml-1 text-lg mr-2 font-semibold">
                    Intermediate Level
                  </p>
                  <img src="/src/assets/clarity_book-line.png" alt="" />
                  <p className="ml-1 text-lg mr-3 font-semibold">10 Modul</p>
                  <img src="/src/assets/ri_time-fill.png" alt="" />
                  <p className="ml-1 text-lg font-semibold">120 Menit</p>
                </div>
                <div className="flex items-center justify-items-end">
                  <Button className="bg-active ml-5 mt-3">
                    <img
                      src="/src/assets/Vector (1).png"
                      alt=""
                      className="mr-2"
                    />
                    <div className="mr-5 text-lg">Beli</div>
                    <div className="text-lg font-bold">Rp.249.000</div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[400px] h-[280px] rounded-sm shadow-md bg-white flex flex-col mr-4">
              <div>
                <img
                  src="/src/assets/image (1).png"
                  alt=""
                  className="w-full h-[100px] mt-[-10px] mb-2"
                />
              </div>
              <div className="w-[400px] h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h1 className="text-primary text-lg font-bold ml-3">
                    UI/UX Design
                  </h1>
                  <div className="flex items-center justify-self-end mr-4">
                    <img src="/src/assets/ic_round-star.png" alt="" />
                    <p className="ml-2 tex-lg font-bold">4.8</p>
                  </div>
                </div>
                <div>
                  <h1 className="ml-3 font-bold text-sm mt-4">
                    Membuat Wireframe Hingga ke Visual Design
                  </h1>
                  <h1 className="ml-3 font-semibold text-sm mt-1">
                    By Angela Doe
                  </h1>
                </div>
                <div className="flex items-center ml-3 mt-2">
                  <img src="/src/assets/Vector.png" alt="" />
                  <p className="ml-1 text-lg mr-2 font-semibold">
                    Intermediate Level
                  </p>
                  <img src="/src/assets/clarity_book-line.png" alt="" />
                  <p className="ml-1 text-lg mr-3 font-semibold">5 Modul</p>
                  <img src="/src/assets/ri_time-fill.png" alt="" />
                  <p className="ml-1 text-lg font-semibold">60 Menit</p>
                </div>
                <div className="flex items-center justify-items-end">
                  <Button className="bg-active ml-5 mt-3">
                    <img
                      src="/src/assets/Vector (1).png"
                      alt=""
                      className="mr-2"
                    />
                    <div className="mr-5 text-lg">Beli</div>
                    <div className="text-lg font-bold">Rp.249.000</div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-[400px] h-[280px] rounded-sm shadow-md bg-white flex flex-col">
              <div>
                <img
                  src="/src/assets/image (1).png"
                  alt=""
                  className="w-full h-[100px] mt-[-10px] mb-2"
                />
              </div>
              <div className="w-[400px] h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h1 className="text-primary text-lg font-bold ml-3">
                    UI/UX Design
                  </h1>
                  <div className="flex items-center justify-self-end mr-4">
                    <img src="/src/assets/ic_round-star.png" alt="" />
                    <p className="ml-2 tex-lg font-bold">4.7</p>
                  </div>
                </div>
                <div>
                  <h1 className="ml-3 font-bold text-sm mt-4">
                    Pengenalan tentang Design System
                  </h1>
                  <h1 className="ml-3 font-semibold text-sm mt-1">
                    By Angela Doe
                  </h1>
                </div>
                <div className="flex items-center ml-3 mt-2">
                  <img src="/src/assets/Vector.png" alt="" />
                  <p className="ml-1 text-lg mr-2 font-semibold">
                    Intermediate Level
                  </p>
                  <img src="/src/assets/clarity_book-line.png" alt="" />
                  <p className="ml-1 text-lg mr-3 font-semibold">10 Modul</p>
                  <img src="/src/assets/ri_time-fill.png" alt="" />
                  <p className="ml-1 text-lg font-semibold">120 Menit</p>
                </div>
                <div className="flex items-center justify-items-end">
                  <Button className="bg-active ml-5 mt-3">
                    <img
                      src="/src/assets/Vector (1).png"
                      alt=""
                      className="mr-2"
                    />
                    <div className="mr-5 text-lg">Beli</div>
                    <div className="text-lg font-bold">Rp.249.000</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
