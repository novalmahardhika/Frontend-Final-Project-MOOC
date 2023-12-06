import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <>
      <div className="container-faq bg-secondary w-screen h-full text-xl flex flex-col mt-0">
        <div className="flex justify-center">
          <p className="font-bold text-3xl my-10 mr-6">
            Frequently Asked Questions
          </p>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-2/3 grid grid-cols-2 grid-rows-3 mx-auto  "
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p>Lorem ipsum dolor sit amet.</p>
              </AccordionTrigger>
              <AccordionContent>Lorem ipsum dolor sit amet.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
              <AccordionContent>Lorem ipsum dolor sit amet.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
              <AccordionContent>Lorem ipsum dolor sit amet.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
              <AccordionContent>Lorem ipsum dolor sit amet.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
              <AccordionContent>Lorem ipsum dolor sit amet.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
              <AccordionContent>Lorem ipsum dolor sit amet.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FAQ;
