import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "./ui/card";
import categoryData from "./../pages/beranda/dummyCategory.json";
import { Button } from "./ui/button";
import { useState } from "react";

const FilterCourse = () => {
  const categories = categoryData.heroCategory || [];
  const level = [
    { id: "Beginner", level: "Beginner" },
    { id: "Intermediate", level: "Intermediate" },
    { id: "Advance", level: "Advance" },
  ];
  const sort = [
    { id: 1, type: "Terbaru" },
    { id: 2, type: "Terpopuler" },
    { id: 3, type: "Promo" },
  ];

  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedSort, setSelectedSort] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSortChange = (id) => {
    // Toggle the selected sort
    setSelectedSort((prev) => (prev.includes(id) ? prev.filter((item) => item === id) : [...prev, id]));

    // Log the selected sorts to the console
    logSelected();
  };

  const handleLevelChange = (id) => {
    // Toggle the selected level
    setSelectedLevel((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

    // Log the selected levels to the console
    logSelected();
  };

  const handleCategoryChange = (title) => {
    // Toggle the selected category
    // Assuming that category titles are unique
    setSelectedCategories((check) => (check.includes(title) ? check.filter((item) => item !== title) : [...check, title]));

    // Log the selected categories to the console
    logSelected();
  };

  const logSelected = () => {
    console.log("Selected Sort:", selectedSort);
    console.log("Selected Level:", selectedLevel);
    console.log("Selected Categories:", selectedCategories);
  };

  return (
    <div className="font-poppins">
      <Card className="p-4 space-y-5">
        <div className="font-bold md:text-xl text-xs">Sort</div>
        <div className="space-y-3">
          {sort.map((item) => (
            <div key={item.id}>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-3 h-3 md:w-7 md:h-7"
                  id={`sort-${item.id}`}
                  onCheckedChange={(isChecked) => {
                    if (isChecked) {
                      handleSortChange(item.id);
                    }
                  }}
                  value={item.id}
                />
                <div className="grid gap-1.5 leading-none ">
                  <label className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{item.type}</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="font-bold md:text-xl text-xs">Level</div>
        <div className="space-y-3">
          {level.map((item) => (
            <div key={item.id}>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-3 h-3 md:w-7 md:h-7"
                  id={`level-${item.id}`}
                  onCheckedChange={(isChecked) => {
                    if (isChecked) {
                      handleLevelChange(item.id);
                    }
                  }}
                  value={item.id}
                />
                <div className="grid gap-1.5 leading-none ">
                  <label className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{item.level}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="font-bold md:text-xl text-xs">Kategori</div>
          {categories.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2"
            >
              <Checkbox
                className="w-3 h-3 md:w-7 md:h-7"
                id={item.title}
                onCheckedChange={(isChecked) => {
                  if (isChecked) {
                    handleCategoryChange(item.title);
                  }
                }}
                value={item.title}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={item.title}
                  className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.title}
                </label>
              </div>
            </div>
          ))}
        </div>
        <Button className="shadow-none bg-secondary text-destructive w-full hover:text-white">Hapus Filter</Button>
      </Card>
    </div>
  );
};

export default FilterCourse;
