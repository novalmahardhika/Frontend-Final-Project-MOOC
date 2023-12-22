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
            <h1 className="font-bold text-xl">Kategori Belajar</h1>
            <Button className="text-xs h-8 hover:bg-active">Lihat Semua</Button>
          </div>

          <div className="flex flex-wrap gap-6 justify-between pb-10 ">
            {categories.map((item) => (
              <Link
                to={`/course?category=${encodeURIComponent(item.value)}`}
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
