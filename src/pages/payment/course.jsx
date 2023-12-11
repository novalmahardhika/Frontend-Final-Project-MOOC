import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const PaidCourse = () => {
  return (
    <div className="font-poppins">
      <Card className="w-full p-2">
        <CardHeader className="font-bold text-primary">Pembayaran Kelas</CardHeader>
        <CardContent>
          <div className="mb-5 flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149065782.jpg?w=996&t=st=1702183073~exp=1702183673~hmac=5752829d904c1e7cb82c22375c5ad509a00e045d807f1fe1e6b4632d096eea74"
              alt=""
              className=" object-cover w-96 h-44 rounded-sm "
            />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <Label className="font-semibold">Harga</Label>
              <div>Rp.349.000</div>
            </div>
            <div>
              <Label className="font-semibold">PPN 11%</Label>
              <div>Rp.38.390</div>
            </div>
            <div>
              <Label className="font-semibold">Total Bayar</Label>
              <div>Rp.387.390</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-success  w-full h-12 rounded-full hover:bg-active">Bayar dan Ikuti Kelas Selamanya</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default PaidCourse;
