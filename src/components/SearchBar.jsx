import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { GlobalContext } from "../context/GlobalContext";

function SearchBar() {
  const {
    users,
    setUsers,
    selectedRows,
    searchValue,
    setSearchValue,
    setSelectedRows,
  } = useContext(GlobalContext);

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete selected users?"
    );
    if (isConfirmed) {
      const newUsers = users.filter(
        (user) => !selectedRows.find((row) => row.id === user.id)
      );
      setUsers(newUsers);
      setSelectedRows([]);
    }
  };

  return (
    <div className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg text-[#82888C]">
        <SearchIcon style={{ width: "30px", height: "30px" }} />
        <input
          type="text"
          placeholder="Search"
          className="outline-none font-semibold"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <button
        disabled={selectedRows.length === 0 || users.length === 0}
        className="text-[#82888C] disabled:cursor-not-allowed font-semibold mr-1"
        onClick={handleDelete}
      >
        <DeleteIcon style={{ width: "30px", height: "30px" }} /> Delete
      </button>
    </div>
  );
}

export default SearchBar;
