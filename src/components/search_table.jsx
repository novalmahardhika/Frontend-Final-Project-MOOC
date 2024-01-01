import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Search = ({ onSearchChange }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchTerm("");
    onSearchChange("");
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  return (
    <>
      <div className="flex space-x-3 items-center">
        <div className={`transition-all duration-300 transform ${isSearchVisible ? "scale-x-1" : "scale-x-0"}`}>
          <Input
            type="text"
            placeholder="Search.."
            className="rounded-md w-full"
            value={searchTerm}
            onChange={handleSearchChange}
            autoFocus
          />
        </div>
        <div
          className="text-2xl font-bold text-active cursor-pointer hover:text-primary"
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon icon={isSearchVisible ? faCircleXmark : faSearch} />
        </div>
      </div>
    </>
  );
};

Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;
