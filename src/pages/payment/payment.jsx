import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import visaLogo from "@/assets/visa.png";
import masterCardLogo from "@/assets/master_card.png";
import payPalLogo from "@/assets/paypal.png";
import PaidCourse from "./course";

const Payment = () => {
  return (
    <div className="mt-5 font-poppins">
      <div className="container flex justify-center space-x-20">
        <div className="w-3/5">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-5"
          >
            <AccordionItem
              value="item-1"
              className=" rounded-sm space-y-2 border-none"
            >
              <AccordionTrigger className=" bg-black text-white no-underline px-3 rounded-sm hover:no-underline">Bank Transfer</AccordionTrigger>
              <AccordionContent className=" shadow-lg rounded-sm p-5 border">
                <div className="bg-white flex justify-between space-x-5 py-4">
                  <div className="space-y-3">
                    <Label>Bank Name</Label>
                    <Select>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select Bank Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Bank Name</SelectLabel>
                          <SelectItem value="BCA">BCA</SelectItem>
                          <SelectItem value="BNI">BNI</SelectItem>
                          <SelectItem value="BRI">BRI</SelectItem>
                          <SelectItem value="Mandiri">Mandiri</SelectItem>
                          <SelectItem value="OCBC">OCBC</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 w-full">
                    <Label>Account Name</Label>
                    <Input
                      placeholder="Bank Transfer"
                      className="w-4/5"
                    />
                  </div>
                </div>
                <div className="bg-white flex justify-between space-x-5 py-4">
                  <div className="space-y-3">
                    <Label>Bank Name</Label>
                    <Select>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select Bank Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Bank Name</SelectLabel>
                          <SelectItem value="BCA">BCA</SelectItem>
                          <SelectItem value="BNI">BNI</SelectItem>
                          <SelectItem value="BRI">BRI</SelectItem>
                          <SelectItem value="Mandiri">Mandiri</SelectItem>
                          <SelectItem value="OCBC">OCBC</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 w-full">
                    <Label>Account Name</Label>
                    <Input
                      placeholder="Bank Transfer"
                      className="w-4/5"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className=" rounded-sm space-y-2 border-none"
            >
              <AccordionTrigger className=" bg-primary text-white no-underline px-3 rounded-sm hover:no-underline">Credit Card</AccordionTrigger>
              <AccordionContent className=" shadow-lg rounded-sm p-5 border">
                <div className="bg-white space-y-4 py-3">
                  <div className="flex justify-center space-x-3 items-center pb-2">
                    <img
                      src={masterCardLogo}
                      className="h-5 object-contain"
                    />
                    <img
                      src={visaLogo}
                      className="h-4 object-contain "
                    />
                    <img
                      src={payPalLogo}
                      className="h-4 object-contain "
                    />
                  </div>
                  <div className="space-y-2 w-3/5 mx-auto">
                    <Label>Card Number</Label>
                    <Input
                      placeholder="B4480 0000 0000 0000"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2 w-3/5 mx-auto">
                    <Label>Card Holder Name</Label>
                    <Input
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between w-3/5 mx-auto">
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input
                        placeholder="000"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        placeholder="07/24"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="w-2/5 ">
          <PaidCourse />
        </div>
      </div>
    </div>
  );
};
export default Payment;
