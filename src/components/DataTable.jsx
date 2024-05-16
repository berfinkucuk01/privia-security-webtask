import { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { GlobalContext } from "../context/GlobalContext";

export default function DataTable() {
  const {
    users,
    setUsers,
    setIsModalOpen,
    setIsEditing,
    setEditingUser,
    setSelectedRows,
    selectedRows,
    activeTab,
    searchValue,
  } = useContext(GlobalContext);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllClick = () => {
    if (!selectAll) {
      const newSelectedRows = users.map((row) => row);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  const isSelected = (id) =>
    selectedRows.findIndex((row) => row.id === id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selectedRows.findIndex((row) => row.id === id);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows,
        users.find((row) => row.id === id)
      );
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const handleEditClick = (id) => {
    setIsEditing(true);
    setEditingUser(users.find((user) => user.id === id));
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-[#F5F5F7]">
          <TableRow>
            <TableCell
              padding="checkbox"
              style={{ width: "1px", paddingRight: "16px" }}
            >
              <Checkbox
                indeterminate={selectAll && selectedRows.length < users.length}
                checked={selectAll}
                onChange={handleSelectAllClick}
                inputProps={{ "aria-label": "select all desserts" }}
              />
            </TableCell>
            <TableCell
              style={{
                paddingRight: "32px",
                color: "#3A3C40",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "14.63px",
              }}
            >
              Avatar
            </TableCell>
            <TableCell
              style={{
                paddingRight: "32px",
                color: "#3A3C40",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "14.63px",
              }}
            >
              Name
            </TableCell>
            <TableCell
              style={{
                paddingRight: "32px",
                color: "#3A3C40",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "14.63px",
              }}
            >
              Username
            </TableCell>
            <TableCell
              style={{
                paddingRight: "32px",
                color: "#3A3C40",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "14.63px",
              }}
            >
              Email
            </TableCell>
            <TableCell
              style={{
                paddingRight: "32px",
                color: "#3A3C40",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "14.63px",
              }}
            >
              Role
            </TableCell>
            <TableCell
              style={{
                paddingRight: "32px",
                color: "#3A3C40",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "14.63px",
              }}
            >
              Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .filter(
              (user) => user.role === activeTab || activeTab === "All Users"
            )
            .filter(
              (user) =>
                user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.username.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
                role="checkbox"
                aria-checked={isSelected(row.id)}
                selected={isSelected(row.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row.id)}
                    onClick={(event) => handleClick(event, row.id)}
                    inputProps={{ "aria-labelledby": `checkbox-${row.id}` }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    className="rounded-md size-14"
                    src={row.avatar}
                    alt="avatar"
                  />
                </TableCell>
                <TableCell
                  style={{
                    color: "#3A3C40",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  style={{
                    color: "#3A3C40",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {row.username}
                </TableCell>
                <TableCell
                  style={{
                    color: "#3A3C40",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {row.email}
                </TableCell>
                <TableCell
                  style={{
                    color: "#3A3C40",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  className="text-red-500"
                >
                  {row.role}
                </TableCell>
                <TableCell>
                  <Box>
                    <button onClick={() => handleEditClick(row.id)}>
                      <EditIcon className="w-8 h-8 text-primary mr-3 cursor-pointer" />
                    </button>
                    <button onClick={() => handleDeleteClick(row.id)}>
                      <DeleteIcon className="w-8 h-8 text-primary cursor-pointer" />
                    </button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
