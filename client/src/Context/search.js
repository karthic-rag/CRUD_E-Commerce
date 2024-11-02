import { useState, useContext, createContext } from "react";

const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keywords: "",
    result: [],
  });

  return (
    <searchContext.Provider value={[values, setValues]}>
      {children}
    </searchContext.Provider>
  );
};

//custom book
const useSearch = () => useContext(searchContext);

export { useSearch, SearchProvider };
