import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <>
      <div className="relative bg-primary font-poppins font-medium right-0 h-[380px] md:h-full w-screen overflow-hidden">
        <div className="flex items-center justify-between  ">
          <div className="grid md:flex items-center h-80 w-screen relative">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover md:w-4/6 h-full "
            />

            <div className="h-screen absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-primary opacity-100 md:w-4/6"></div>
            <div className="relative z-1 grid grid-cols-3">
              <div className="pt-6 md:pt-0 col-span-3 text-white space-y-2 mx-auto">
                <p className="md:text-2xl font-bold text-center md:text-start w-32 md:w-48 mb-2 md:mb-5 ">Belajar dari Praktisi Terbaik!</p>
                <Button className="bg-secondary hover:bg-active text-black w-32 h-6 md:w-52 md:h-8">Ikuti Kelas!</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
