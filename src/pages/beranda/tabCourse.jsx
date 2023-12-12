import { Button } from "@/components/ui/button";

const tabCourse = () => {
  return (
    <>
      <div className="container">
        <div className="font-poppins space-y-6">
          <div className="flex items-center justify-between pt-10">
            <h1 className="font-bold text-xl">Kursus Populer</h1>
            <Button className="text-xs h-8 hover:bg-active">Lihat Semua</Button>
          </div>
          <div className="flex justify-start">
            <div className=" m-2 flex flex-col items-center">
              <Button className="bg-secondary text-black text-sm ">All</Button>
            </div>
            <div className="m-2 flex flex-col items-center">
              <Button className="bg-secondary text-black text-sm ">Data Science</Button>
            </div>
            <div className="m-2 flex flex-col items-center">
              <Button className="bg-primary text-white text-sm ">UI/UX Design</Button>
            </div>
            <div className="m-2 flex flex-col items-center">
              <Button className="bg-secondary text-black text-sm ">Android Development</Button>
            </div>
            <div className="  m-2 flex flex-col items-center">
              <Button className="bg-secondary text-black text-sm ">Web Development</Button>
            </div>
            <div className="m-2 flex flex-col items-center">
              <Button className="bg-secondary text-black text-sm ">IOS Development</Button>
            </div>
            <div className="m-2 flex flex-col items-center">
              <Button className="bg-secondary text-black text-sm ">Bussiness Intelligence</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default tabCourse;
