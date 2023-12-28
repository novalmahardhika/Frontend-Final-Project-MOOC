import Footer from "../beranda/Footer";
import FilterCourse from "@/pages/course_list/filter_course";
import Card_Course from "./card_course";
import { useState } from "react";

const Courses = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    sort: null,
    level: [],
    category: [],
  });

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: values,
    }));
  };

  const handleSortChange = (sortValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      sort: sortValue,
    }));
  };

  return (
    <div className=" font-poppins">
      <div className="container mt-10 mb-8">
        <div className="text-3xl font-semibold text-primary">Cari Kelas</div>
        <div className="text-3xl font-semibold text-primary">Sesuai Karir Kamu</div>
      </div>
      <div className="container flex justify-between gap-16">
        <div className="w-1/3">
          <FilterCourse
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="font-poppins flex flex-wrap gap-10 mb-20 w-full">
          <Card_Course selectedFilters={selectedFilters} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
