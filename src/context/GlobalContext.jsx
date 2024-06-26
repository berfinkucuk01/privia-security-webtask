import { createContext } from "react";
import { useState } from "react";
export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeTab, setActiveTab] = useState("All Users");
  const [searchValue, setSearchValue] = useState("");
  const [currentPageData, setCurrentPageData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  function getPageData(users, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    setCurrentPageData(users.slice(startIndex, startIndex + pageSize));
  }

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
        isModalOpen,
        setIsModalOpen,
        isEditing,
        setIsEditing,
        editingUser,
        setEditingUser,
        selectedRows,
        setSelectedRows,
        activeTab,
        setActiveTab,
        searchValue,
        setSearchValue,
        currentPageData,
        setCurrentPageData,
        pageNumber,
        setPageNumber,
        getPageData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
