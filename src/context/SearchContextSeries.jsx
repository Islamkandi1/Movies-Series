import React, { createContext, useState } from "react";
export const searchContextSeries = createContext();
const SearchContextSeries = ({ children }) => {
  const [searchDataSeries, setSearchDateSeries] = useState([]);

  
  const values = {
    searchDataSeries,
    setSearchDateSeries,
  };
  return (
    <searchContextSeries.Provider value={values}>
      {children}
    </searchContextSeries.Provider>
  );
};

export default SearchContextSeries;
