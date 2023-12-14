import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <>
      <div className="relative bg-primary font-poppins font-medium right-0 h-full w-screen overflow-hidden">
        <div className="flex items-center justify-between  ">
          <div className="flex items-center h-80 w-screen relative">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-4/6 h-full  "
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary opacity-100 w-4/6"></div>
            <div className="relative z-1 grid grid-cols-3">
              <div className="col-span-3 text-white space-y-2">
                <p className="text-2xl font-bold">Belajar</p>
                <p className="text-2xl font-bold pb-3">dari Praktisi Terbaik!</p>
                <Button className="bg-secondary hover:bg-active text-black w-52">Ikuti Kelas!</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
