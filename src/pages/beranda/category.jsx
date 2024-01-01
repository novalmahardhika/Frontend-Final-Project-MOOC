import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import heroCategoryData from "./dummyCategory.json";

const Category = () => {
  const categories = heroCategoryData.heroCategory || [];
  return (
    <>
      <div className="bg-secondary w-screen">
        <div className="container font-poppins pt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold md:text-xl">Kategori Belajar</h1>
            <Link to="/courses">
              <Button className="text-xs h-6 md:h-8 hover:bg-active">Lihat Semua</Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 justify-between pb-10 overflow-x-scroll md:overflow-x-hidden">
            {categories.map((item) => (
              <Link
                to={`/courses?category=${encodeURIComponent(item.value)}`}
                className={`hover:text-active cursor-pointer`}
                key={item.title}
              >
                <div className="space-y-2 cursor-pointer">
                  <Card className="hover:opacity-60 w-32 md:w-48 ">
                    <div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className=" object-cover w-screen h-20 md:h-32 rounded-sm "
                      />
                    </div>
                  </Card>

                  <div className="text-xs md:text-sm font-bold text-center">{item.title}</div>
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
