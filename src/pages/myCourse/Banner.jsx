import { Input } from "@/components/ui/input";
const Banner_KelasSaya = () => {
  return (
    <>
      <div className="relative bg-secondary font-poppins font-medium right-0 h-full w-screen overflow-hidden">
        <div className="h-[120px] ">
          <div className="flex items-center justify-between">
            <div className="ml-[200px] mt-[30px]">
              <p className="ml-2 text-2xl font-bold">Kelas Berjalan</p>
            </div>
            <div className="ml-2 mr-[100px] mt-[30px]">
              <Input type="Cari kelas" placeholder="Cari Kelas" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner_KelasSaya;
