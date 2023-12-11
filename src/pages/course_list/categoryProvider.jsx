import { useState } from "react";
import PropTypes from "prop-types";
import CategoryContext from "./CategoryContext"; // Import the context

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>{children}</CategoryContext.Provider>;
};

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
