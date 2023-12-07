// // CategoryProvider.js
// import { createContext, useState, useContext } from "react";
// import PropTypes from "prop-types";

// const CategoryContext = createContext();

// export const useCategory = () => {
//   const context = useContext(CategoryContext);
//   if (!context) {
//     throw new Error("useCategory must be used within a CategoryProvider");
//   }
//   return context;
// };

// export const CategoryProvider = ({ children }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   return <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>{children}</CategoryContext.Provider>;
// };

// CategoryProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
