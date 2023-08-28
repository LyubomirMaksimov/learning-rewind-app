import React, { createContext, useContext, useState } from "react";

// Create the context
const FilterContext = createContext();

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterContextProvider({ children }) {
  const [filters, setFilters] = useState({
    section: 0,
    example: 0,
  });

  const contextValue = {
    filters,
    setFilters,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}
