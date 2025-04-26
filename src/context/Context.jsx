import { createContext, useState } from "react";

export const SearchContext = createContext();

const ContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, activePage }}>
      {children}
    </SearchContext.Provider>
  );
};

export default ContextProvider;
