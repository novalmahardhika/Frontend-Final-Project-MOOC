// Filter.js

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Filter = ({ onFilterChange }) => {
  const [position, setPosition] = useState("bottom");

  const handleFilterSelect = (value) => {
    setPosition(value);
    onFilterChange(value); // Callback to notify Dashboard component about the filter change
  };

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
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
