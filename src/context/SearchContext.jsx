import React, { createContext, useState } from "react";
export const searchContext = createContext();
const SearchContext = ({ children }) => {
  const [searchData, setSearchDate] = useState([]);
  
  const values = {
    searchData,
    setSearchDate,
  };
  return (
    <searchContext.Provider value={values}>{children}</searchContext.Provider>
  );
};

export default SearchContext;
