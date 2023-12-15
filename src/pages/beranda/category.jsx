import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Category = () => {
  const heroCategory = [
    {
      title: "UI/UX Design",
      image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149065782.jpg?w=996&t=st=1702183073~exp=1702183673~hmac=5752829d904c1e7cb82c22375c5ad509a00e045d807f1fe1e6b4632d096eea74",
      path: "UI/UX Design",
    },
    {
      title: "Product Management",
      image: "https://img.freepik.com/free-vector/workgroup-discussing-project-scrum-meeting_1262-19823.jpg?w=996&t=st=1702183569~exp=1702184169~hmac=70732a67d4254170c1290fdd249158cf3292b69dedeb725a2d043c5441305d70",
      path: "Product Management",
    },
    {
      title: "Web Development",
      image: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg?w=996&t=st=1702183624~exp=1702184224~hmac=729c186bc370adc8154ce9489cfe92a0a8470e6e8ffb12c9878f36f80ded4809",
      path: "Web Development",
    },
    {
      title: "Android Development",
      image:
        "https://img.freepik.com/free-vector/incoming-message-isometric-icon-mobile-phone-with-chat-dialog-screen-voice-message_39422-972.jpg?w=900&t=st=1702183426~exp=1702184026~hmac=040925c5bfeaff490151c950614596332769a47ef43502614e3b88dd7471e416",
      path: "Adnroid Development",
    },
    {
      title: "IOS Development",
      image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051191.jpg?w=996&t=st=1702181049~exp=1702181649~hmac=84a314790cfc20651849b9c49d1d8e158451fb3fa326cc3af026e56221cda611",
      path: "IOS Development",
    },
    {
      title: "Data Science",
      image: "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18141.jpg?w=1060&t=st=1702181284~exp=1702181884~hmac=4a9666b264c033af86a6edc4158f20cf03c0868a3f92e9ef433db09ccf4c9de0",
      path: "Data Scinece",
    },
  ];

  return (
    <>
      <div className="bg-secondary w-screen">
        <div className="container font-poppins pt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">Kategori Belajar</h1>
            <Button className="text-xs h-8 hover:bg-active">Lihat Semua</Button>
          </div>

          <div className="flex flex-wrap gap-6 justify-between pb-10 ">
            {heroCategory.map((item) => (
              <Link
                to={`/course?category=${encodeURIComponent(item.path)}`}
                className={`hover:text-active cursor-pointer`}
                key={item.title}
              >
                <div className="space-y-3 cursor-pointer">
                  <Card className="hover:opacity-60">
                    <div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className=" object-cover w-48 h-32 rounded-sm "
                      />
                    </div>
                  </Card>

                  <div className="text-sm font-bold text-center">{item.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
