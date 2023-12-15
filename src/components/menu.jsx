// Menu.js
import { Button } from "./ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuTrigger, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCategoryContext } from "./../pages/course_list/categoryContext";

const Menu = () => {
  const { setSelectedCategory } = useCategoryContext();
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState([]);

  const menu = [
    { title: "Web Development", value: "Web Development" },
    { title: "Android Development", value: "Android Development" },
    { title: "Data Science", value: "Data Science" },
    { title: "UI/UX Design", value: "UI/UX Design" },
    { title: "Product Management", value: "Product Management" },
    { title: "IOS Development", value: "IOS Development" },
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("https://idea-academy.up.railway.app/api/v1/course", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const uniqueCategories = res.data.data.filter((c, index, self) => index === self.findIndex((category) => category.category === c.category));
        setCategory(uniqueCategories);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
  }, [token]);

  return (
    <div>
      <NavigationMenu className="w-full">
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem className="">
            <Link to="/beranda">
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-primary text-white p-6`}>Beranda</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex justify-between ">
            <NavigationMenuTrigger className="bg-primary text-white ">Kelas</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-7 p-4 md:w-[600px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                <div className="row-span-3">
                  <Link
                    to="/course"
                    onClick={() => setSelectedCategory("")}
                  >
                    <NavigationMenuLink asChild>
                      <div className="flex h-full w-full select-none flex-col justify-center bg-primary text-white from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md ">
                        <span className="text-xs text-center text-success">Trusted by 900K+ Students</span>
                        <div className="mb-2 mt-4 text-lg font-medium text-active text-center">Build Your Future Career</div>
                        <p className="text-xs leading-tight mb-4 text-center text-muted">Explore kelas bersama mentor Expert</p>
                        <Button className="bg-secondary text-primary h-8 w-28 hover:text-primary hover:bg-muted-foreground mx-auto font-semibold mt-3">All Course</Button>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </div>
                <div className="flex space-x-2 items-center justify-start my-auto">
                  <div className="space-y-3 flex flex-col my-auto">
                    {category.map((item) => (
                      <div
                        key={item.id}
                        className="hidden"
                      >
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/course?category=${encodeURIComponent(item.category)}`}
                            className={`hover:text-active cursor-pointer`}
                          >
                            {item.category}
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    ))}
                    {menu.map((item) => (
                      <div key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/course?category=${encodeURIComponent(item.value)}`}
                            className={`hover:text-active cursor-pointer`}
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <Link to="#">
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-primary text-white p-6`}>Informasi</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Menu;
