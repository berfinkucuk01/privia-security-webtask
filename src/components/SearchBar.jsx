import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { GlobalContext } from "../context/GlobalContext";

function SearchBar() {
  const { users, setUsers } = useContext(GlobalContext);

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete selected users?"
    );
    if (isConfirmed) {
      const newUsers = users.filter((user) => !user.selected);

      setUsers(newUsers);
    }
  };

  return (
    <div className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg text-[#82888C]">
        <SearchIcon style={{ width: "30px", height: "30px" }} />
        <input type="text" placeholder="Search" className="outline-none" />
      </div>
      <button className="text-[#82888C]" onClick={handleDelete}>
        {" "}
        <DeleteIcon style={{ width: "30px", height: "30px" }} /> Delete{" "}
      </button>
    </div>
  );
}

export default SearchBar;
