import { Button } from "../ui/button";

const Category = () => {
  return (
    <>
      <div className="container-category bg-secondary w-screen h-full text-xl flex flex-col">
        <div className="font-poppins p-5 flex justify-between mt-8 mx-[90px]">
          <h1 className="font-bold ml-[40px]">Kategori Belajar</h1>
          <Button className="text-sm ">Lihat Semua</Button>
        </div>

        <div className="flex justify-center mt-0">
          <div className="w-[180px] h-full p-3 m-4 shadow-md flex flex-col items-center">
            <img src="/src/assets/UIUX.png" alt="" />
            <p className="text-center mt-2 font-semibold text-sm">
              UI/UX Design
            </p>
          </div>
          <div className="w-[180px] h-full p-3 m-4 shadow-md flex flex-col items-center">
            <img src="/src/assets/PM.png" alt="" />
            <p className="text-center mt-2 font-semibold text-sm">
              Product Management
            </p>
          </div>
          <div className="w-[180px] h-full p-3 m-4 shadow-md flex flex-col items-center">
            <img src="/src/assets/Web.png" alt="" />
            <p className="text-center mt-2 font-semibold text-sm">
              Web Development
            </p>
          </div>
          <div className="w-[180px] h-full p-3 m-4 shadow-md flex flex-col items-center">
            <img src="/src/assets/Android.png" alt="" />
            <p className="text-center mt-2 font-semibold text-sm">
              Android Development
            </p>
          </div>
          <div className="w-[180px] h-full p-3 m-4 shadow-md flex flex-col items-center">
            <img src="/src/assets/IOS.png" alt="" />
            <p className="text-center mt-2 font-semibold text-sm">
              IOS Development
            </p>
          </div>
          <div className="w-[180px] h-full p-3 m-4 shadow-md flex flex-col items-center">
            <img src="/src/assets/Data.png" alt="" />
            <p className="text-center mt-2 font-semibold text-sm">
              Data Science
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
