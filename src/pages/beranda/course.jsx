// import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Course = () => {
  const heroCategory = [
    { title: "UI/UX Design", image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149065782.jpg?w=996&t=st=1702183073~exp=1702183673~hmac=5752829d904c1e7cb82c22375c5ad509a00e045d807f1fe1e6b4632d096eea74", path: "" },
    {
      title: "Product Management",
      image: "https://img.freepik.com/free-vector/workgroup-discussing-project-scrum-meeting_1262-19823.jpg?w=996&t=st=1702183569~exp=1702184169~hmac=70732a67d4254170c1290fdd249158cf3292b69dedeb725a2d043c5441305d70",
      path: "",
    },
    {
      title: "Web Development",
      image: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg?w=996&t=st=1702183624~exp=1702184224~hmac=729c186bc370adc8154ce9489cfe92a0a8470e6e8ffb12c9878f36f80ded4809",
      path: "",
    },
  ];

  return (
    <>
      <div className="container mt-10">
        <div className="flex flex-wrap gap-6 justify-between pb-10 ">
          {heroCategory.map((item) => (
            <div
              className="space-y-3 cursor-pointer"
              key={item.title}
            >
              <Card className="hover:opacity-60">
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" object-cover w-96 h-56 rounded-sm "
                  />
                </div>
              </Card>
              <div className="text-sm font-bold text-center">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
