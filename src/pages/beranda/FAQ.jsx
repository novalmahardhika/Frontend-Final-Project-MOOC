import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FrequentlyAskQuestions = () => {
  const FAQ = [
    {
      id: 1,
      question: "Apa itu IdeaMy atau Idea Academy?",
      answer: "IdeaMy atau Idea Academy adalah platform pembelajaran daring yang menyediakan berbagai kursus dan sumber daya untuk membantu Anda mengembangkan keterampilan dan mencapai tujuan belajar Anda.",
    },
    {
      id: 2,
      question: "Bagaimana cara mendaftar di IdeaMy atau Idea Academy?",
      answer: "Untuk mendaftar, kunjungi halaman pendaftaran kami dan ikuti langkah-langkah yang tertera. Isi informasi yang diperlukan, dan Anda akan mendapatkan akses ke berbagai kursus.",
    },
    {
      id: 3,
      question: "Berapa biaya langganan IdeaMy atau Idea Academy?",
      answer: "Detail biaya dan langganan dapat ditemukan di halaman Tarif kami. Kami menawarkan berbagai opsi langganan yang sesuai dengan kebutuhan dan anggaran Anda.",
    },
    {
      id: 4,
      question: "Apa itu IdeaMy atau Idea Academy?",
      answer: "IdeaMy atau Idea Academy adalah platform pembelajaran daring yang menyediakan berbagai kursus dan sumber daya untuk membantu Anda mengembangkan keterampilan dan mencapai tujuan belajar Anda.",
    },
    {
      id: 5,
      question: "Bagaimana cara mendaftar di IdeaMy atau Idea Academy?",
      answer: "Untuk mendaftar, kunjungi halaman pendaftaran kami dan ikuti langkah-langkah yang tertera. Isi informasi yang diperlukan, dan Anda akan mendapatkan akses ke berbagai kursus.",
    },
    {
      id: 6,
      question: "Berapa biaya langganan IdeaMy atau Idea Academy?",
      answer: "Detail biaya dan langganan dapat ditemukan di halaman Tarif kami. Kami menawarkan berbagai opsi langganan yang sesuai dengan kebutuhan dan anggaran Anda.",
    },
  ];

  return (
    <>
      <div className="bg-secondary w-screen text-xl flex flex-col mt-10 pb-10">
        <div className="container  md:h-[400px] mt-20 md:mt-28 mb-10 space-y-5">
          <div className="text-center space-y-3 mb-5">
            <p className="font-bold text-3xl ">Frequently Asked Questions</p>
            <p className="text-lg text-success">#TanyaIdeamy</p>
          </div>
          <div className="mx-auto flex justify-center md:z-10 md:absolute">
            <Accordion
              type="single"
              collapsible
              className="md:flex grid gap-5 md:flex-wrap no-underline justify-center"
            >
              {" "}
              {FAQ.map((item) => (
                <div
                  key={item.id}
                  className="bg-white px-3 rounded-md md:w-2/5 w-80"
                >
                  <AccordionItem value={item.id}>
                    <AccordionTrigger className="text-sm text-start font-semibold hover:no-underline hover:text-active">{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrequentlyAskQuestions;
