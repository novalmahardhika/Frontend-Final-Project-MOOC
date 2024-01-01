import Footer from "../beranda/Footer";
import FilterCourse from "@/pages/course_list/filter_course";
import Card_Course from "./card_course";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TabCourse from "./tab";

const Courses = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [activeTab, setActiveTab] = useState("All");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      {isMobile ? (
        <>
          {isFilterOpen && (
            <button
              className="z-20 fixed top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsFilterOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <div className=" font-poppins">
            <Dialog>
              <div className="container mt-8 mb-8 flex justify-between">
                <div className="text-xl font-semibold text-primary">Cari Kelas</div>
                <DialogTrigger asChild>
                  <div className="font-semibold hover:text-active cursor-pointer">Filter</div>
                </DialogTrigger>
              </div>

              <DialogContent className="sm:max-w-md fixed h-fit bottom-0">
                <FilterCourse
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                />
              </DialogContent>
            </Dialog>
            {isFilterOpen && (
              <div className="fixed z-10 inset-0 bottom-0">
                <FilterCourse
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                />
              </div>
            )}
            <div className="flex justify-center">
              <TabCourse onTabChange={handleTabChange} />
            </div>
            <div className="container flex justify-between gap-16">
              <div className="font-poppins flex flex-wrap gap-10 mb-20 w-full">
                <Card_Course
                  selectedFilters={selectedFilters}
                  activeTab={activeTab}
                />
              </div>
            </div>
            <Footer />
          </div>
        </>
      ) : (
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
            <div className="font-poppins grid gap-5 w-full">
              <TabCourse onTabChange={handleTabChange} />
              <div className="flex flex-wrap gap-10 mb-20">
                <Card_Course
                  selectedFilters={selectedFilters}
                  activeTab={activeTab}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Courses;
