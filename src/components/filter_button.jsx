// Filter.js

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Filter = ({ onFilterChange, onSearchChange }) => {
  const [position, setPosition] = useState("ASC");

  const handleFilterSelect = (value) => {
    setPosition(value);
    if (typeof(onFilterChange) == "function") onFilterChange(value); // Callback to notify Dashboard component about the filter change
  };

  const handleSearch = (value) => {
    if (typeof(onFilterChange) == "function") onSearchChange(value);
  }

  return (
    <div className="flex space-x-4 justify-between">
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className=" w-24 justify-between bg-active text-white hover:bg-primary "
          >
            <Button>
              <FontAwesomeIcon icon={faFilter} />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={handleFilterSelect}
            >
              <DropdownMenuRadioItem value="ASC">ASC</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="DESC">DESC</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-2xl font-bold text-active cursor-pointer hover:text-primary">
        <input
          type="search"
          className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
      {/* <div className="text-2xl font-bold text-active cursor-pointer hover:text-primary">
        <FontAwesomeIcon icon={faSearch} />
      </div> */}
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  onSearchChange: PropTypes.func,
};

export default Filter;
