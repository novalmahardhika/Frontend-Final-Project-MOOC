import { Button } from "../ui/button";

const Banner = () => {
  return (
    <>
      <div className="bg-primary font-poppins font-medium  top-3 right-0 h-full w-screen ">
        <div className="flex items-center justify-between bg-primary ">
          <div className="flex items-center h-[300px] w-screen relative">
            <img
              src="/src/assets/kenny-eliason-zFSo6bnZJTw-unsplash.jpg"
              alt=""
              className="object-cover w-3/4 h-full  "
            />

            <div className="text-white text-lg font-bold mx-auto  flex flex-col items-center">
              <p className="justify-self-start">Belajar</p>
              <p className="mb-5">dari Praktisi Terbaik!</p>
              <div className="">
                <Button className="bg-secondary hover:bg-active text-black">
                  Ikuti Kelas!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
