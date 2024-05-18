import { useContext, useEffect, useState } from "react";
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
import Pagination from "@mui/material/Pagination";
import { deleteUserApi, getUsersApi } from "../services/api";

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
    getPageData,
    pageNumber,
    currentPageData,
    setPageNumber,
  } = useContext(GlobalContext);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersApi();
        setUsers(data);
        getPageData(data, pageNumber, 10);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [pageNumber]);

  useEffect(() => {
    getPageData(users, pageNumber, 10);
  }, [users, pageNumber]);

  const handleSelectAllClick = () => {
    if (!selectAll) {
      setSelectedRows(currentPageData);
    } else {
      const currentPageIds = currentPageData.map((row) => row.id);
      const newSelectedRows = selectedRows.filter(
        (row) => !currentPageIds.includes(row.id)
      );
      setSelectedRows(newSelectedRows);
    }
    setSelectAll(!selectAll);
  };

  const isSelected = (id) =>
    selectedRows.findIndex((row) => row.id === id) !== -1;

  const handleSelect = (event, id) => {
    const selectedIndex = selectedRows.findIndex((row) => row.id === id);

    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = [...selectedRows, users.find((row) => row.id === id)];
    } else {
      newSelectedRows = selectedRows.filter((row) => row.id !== id);
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
      deleteUserApi(id).then(() =>
        getUsersApi().then((data) => setUsers(data))
      );
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="">
          <TableHead className="bg-[#F5F5F7]">
            <TableRow>
              <TableCell padding="checkbox" style={{ width: "1px" }}>
                <Checkbox
                  indeterminate={
                    selectAll && selectedRows.length < users.length
                  }
                  checked={selectAll}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
              <TableCell
                style={{
                  align: "left",
                  color: "#3A3C40",
                  fontSize: "15px",
                  fontWeight: "600",
                  lineHeight: "14.63px",
                  display: "inline-block",
                }}
              >
                Avatar
              </TableCell>
              <TableCell
                style={{
                  align: "left",
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
                  align: "left",
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
                  align: "left",
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
                  align: "left",
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
                  color: "#3A3C40",
                  fontSize: "15px",
                  fontWeight: "600",
                  lineHeight: "14.63px",
                  width: "0",
                }}
              >
                Edit
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentPageData
              .filter(
                (user) => user.role === activeTab || activeTab === "All Users"
              )
              .filter(
                (user) =>
                  user.email
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  user.username
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
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
                      onClick={(event) => handleSelect(event, row.id)}
                      inputProps={{
                        "aria-labelledby": `checkbox-${row.id}`,
                      }}
                    />
                  </TableCell>
                  <TableCell className="w-20">
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
                      width: "200px",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#3A3C40",
                      fontSize: "15px",
                      fontWeight: "500",
                      width: "200px",
                    }}
                  >
                    {row.username}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#3A3C40",
                      fontSize: "15px",
                      fontWeight: "500",
                      width: "200px",
                    }}
                  >
                    {row.email}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#3A3C40",
                      fontSize: "15px",
                      fontWeight: "500",
                      width: "150px",
                    }}
                    className="text-red-500"
                  >
                    {row.role}
                  </TableCell>
                  <TableCell
                    style={{
                      width: "0px",
                    }}
                  >
                    <Box>
                      <button onClick={() => handleEditClick(row.id)}>
                        <EditIcon className=" h-8 text-primary mr-3 cursor-pointer" />
                      </button>
                      <button onClick={() => handleDeleteClick(row.id)}>
                        <DeleteIcon className=" h-8 text-primary cursor-pointer" />
                      </button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        className="mt-5 flex justify-center rounded-[4px]"
        count={Math.ceil(users.length / 10)}
        shape="rounded"
        page={pageNumber}
        onChange={(event, value) => setPageNumber(value)}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#ccd",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "14.63px",
            borderRadius: "4px",
            marginRight: "4px",
            "&.Mui-selected": {
              backgroundColor: "#2940D3",
              color: "#FFFFFF",
            },
            "&:hover": {
              backgroundColor: "#F5F5F7",
            },
          },
        }}
      />
    </>
  );
}
