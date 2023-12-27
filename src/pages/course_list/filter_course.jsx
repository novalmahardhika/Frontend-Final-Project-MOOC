import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "../../components/ui/card";
import categoryData from "@/pages/beranda/dummyCategory.json";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const FilterCourse = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");

  const categories = categoryData.heroCategory || [];
  const level = [
    { id: "beginner", level: "Beginner" },
    { id: "intermediate", level: "Intermediate" },
    { id: "advance", level: "Advance" },
  ];
  const sort = [
    { id: "Terbaru", type: "Terbaru" },
    { id: "Terpopuler", type: "Terpopuler" },
    { id: "Promo", type: "Promo" },
  ];

  const [checkedSortId, setCheckedSortId] = useState();
  const [checkedLevelIds, setCheckedLevelIds] = useState([]);
  const [checkedCategoryIds, setCheckedCategoryIds] = useState([]);

  const getCategoryItemId = (title) => {
    return `${title.replace(/\s+/g, " ")}`;
  };

  const onCheckedChange = (checked, item, type) => {
    if (type === "sort") {
      const newSearchParams = new URLSearchParams(location.search);

      if (checked) {
        setCheckedSortId(item.id);
        newSearchParams.set("sort", encodeURIComponent(item.id));
        onFilterChange("sort", item.id);
      } else {
        setCheckedSortId(null);
        newSearchParams.delete("sort");
        onFilterChange("sort", null);
      }

      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    } else if (type === "level") {
      const updatedLevelIds = checked ? [...checkedLevelIds, item.id] : checkedLevelIds.filter((id) => id !== item.id);
      setCheckedLevelIds(updatedLevelIds);
      onFilterChange("level", updatedLevelIds);
      const newSearchParams = new URLSearchParams(location.search);
      if (updatedLevelIds.length > 0) {
        newSearchParams.set("level", updatedLevelIds.join(","));
      } else {
        newSearchParams.delete("level");
      }
      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    } else if (type === "category") {
      const itemId = getCategoryItemId(item.title);
      const updatedCategoryIds = checked ? [...checkedCategoryIds, itemId] : checkedCategoryIds.filter((id) => id !== itemId);
      setCheckedCategoryIds(updatedCategoryIds);
      onFilterChange("category", updatedCategoryIds);
      console.log(updatedCategoryIds);
      const newSearchParams = new URLSearchParams(location.search);
      if (updatedCategoryIds.length > 0) {
        newSearchParams.set("category", updatedCategoryIds.join(","));
      } else {
        newSearchParams.delete("category");
      }

      navigate(`${location.pathname}?${newSearchParams.toString()}`);
      onFilterChange("category", updatedCategoryIds);
    }
  };

  const isAnyCheckboxChecked = checkedSortId || checkedLevelIds.length > 0 || checkedCategoryIds.length > 0;

  useEffect(() => {
    // Check the category checkbox based on the categoryParam
    const categoryParamArray = categoryParam ? categoryParam.split(",") : [];
    setCheckedCategoryIds(categoryParamArray);
    onFilterChange("category", categoryParamArray);
  }, [categoryParam, onFilterChange]);

  const handleResetFilters = () => {
    setCheckedSortId(null);
    setCheckedLevelIds([]);
    setCheckedCategoryIds([]);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.delete("sort");
    newSearchParams.delete("level");
    newSearchParams.delete("category");
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
    onFilterChange("sort", null);
    onFilterChange("level", []);
    onFilterChange("category", []);
  };

  return (
    <div className="font-poppins mb-14">
      <Card className="p-4 space-y-5">
        <div className="font-bold md:text-xl text-xs">Sort</div>
        <div className="space-y-2">
          {sort.map((item) => (
            <div key={item.id}>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-3 h-3 md:w-7 md:h-7"
                  id={`sort-${item.id}`}
                  value={item.id}
                  checked={checkedSortId === item.id}
                  onCheckedChange={(checked) => onCheckedChange(checked, item, "sort")}
                />
                <div className="grid gap-1.5 leading-none ">
                  <label className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{item.type}</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="font-bold md:text-xl text-xs">Level</div>
        <div className="space-y-2">
          {level.map((item) => (
            <div key={item.id}>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-3 h-3 md:w-7 md:h-7"
                  id={`level-${item.id}`}
                  value={item.id}
                  checked={checkedLevelIds.includes(item.id)}
                  onCheckedChange={(checked) => onCheckedChange(checked, item, "level")}
                />
                <div className="grid gap-1.5 leading-none ">
                  <label className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{item.level}</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="font-bold md:text-xl text-xs">Kategori</div>
        <div className="space-y-2">
          {categories.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2"
            >
              <Checkbox
                className="w-3 h-3 md:w-7 md:h-7"
                id={getCategoryItemId(item.title)}
                value={item.title}
                checked={checkedCategoryIds.includes(getCategoryItemId(item.title))}
                onCheckedChange={(checked) => onCheckedChange(checked, item, "category")}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={getCategoryItemId(item.title)}
                  className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.title}
                </label>
              </div>
            </div>
          ))}
        </div>

        <Button
          className={`shadow-none bg-secondary text-${isAnyCheckboxChecked ? "destructive" : "inactive"} w-full hover:text-white hover:bg-destructive`}
          onClick={handleResetFilters}
        >
          Hapus Filter
        </Button>
      </Card>
    </div>
  );
};

FilterCourse.propTypes = {
  onFilterChange: PropTypes.func,
};

export default FilterCourse;
