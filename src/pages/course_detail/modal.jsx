import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function DialogDemo() {
  return (
    <Dialog className="font-poppins">
      <DialogTrigger asChild>
        <Button variant="outline">Premium</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] ">
        <DialogHeader>
          <DialogTitle className="text-center text-sm">Selangkah Lagi Menuju</DialogTitle>
          <DialogDescription className="text-center text-2xl text-rpimary">Kelas Premium</DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col">
          <div className="space-y-3 cursor-pointer mx-auto">
            <Card className="">
              <div>
                <img
                  src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149065782.jpg?w=996&t=st=1702183073~exp=1702183673~hmac=5752829d904c1e7cb82c22375c5ad509a00e045d807f1fe1e6b4632d096eea74"
                  alt="UI/UX Design"
                  className=" object-cover w-96 h-56 rounded-sm "
                />
              </div>
            </Card>
            <div className="text-sm font-bold text-center">UI/UX Design</div>
          </div>
        </div>
        <DialogFooter className="flex">
          <Button
            type="button"
            className="flex  mx-auto hover:bg-active w-60"
          >
            Beli Sekarang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
