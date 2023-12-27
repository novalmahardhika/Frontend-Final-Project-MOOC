import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]);
          return;
        }

        const url = `https://idea-academy.up.railway.app/api/v1/courses?search=${encodeURIComponent(searchTerm)}`;
        const res = await axios.get(url);
        setSearchResults(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="font-poppins">
      <Dialog>
        <DialogTrigger>
          <div className="rounded-full bg-white w-11 h-11 flex justify-center items-center text-xl cursor-pointer hover:bg-muted-foreground">
            <FontAwesomeIcon
              icon={faSearch}
              title="search"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="w-screen h-3/4">
          <div className="h-full">
            <DialogHeader className="space-y-3">
              <DialogTitle>Search</DialogTitle>
              <Input
                type="text"
                placeholder="Search a Course"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="h-[400px] overflow-auto">
                {searchResults.length === 0 ? (
                  <div className="text-center">Cari Kursus yang kamu inginkan</div>
                ) : (
                  <div className="flex items-start">
                    <div className=" h-full grid gap-5 w-full">
                      {searchResults.map((course) => (
                        <Link
                          key={course.id}
                          to={`/course/${course.id}`}
                        >
                          <Card
                            course={course}
                            className="flex p-2 gap-3"
                          >
                            <img
                              src={course.image}
                              className="rounded-sm w-36"
                            />
                            <div>
                              <div className="text-lg font-semibold">{course.title}</div>
                              <div className="text-xs mb-2">{course.category}</div>
                              <div>{formatCurrency(course.price)}</div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
