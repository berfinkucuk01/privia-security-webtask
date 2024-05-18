import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AvatarImage1 from "../assets/Avatar1.jpg";
import AvatarImage2 from "../assets/Avatar2.jpg";
import AvatarImage3 from "../assets/Avatar3.jpg";
import AvatarImage4 from "../assets/Avatar4.jpg";
import AvatarImage5 from "../assets/Avatar5.jpg";
import AvatarImage6 from "../assets/Avatar6.jpg";
import { GlobalContext } from "../context/GlobalContext";
import { addUserApi, getUsersApi, updateUserApi } from "../services/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 356,
  bgcolor: "background.paper",
  border: "2px solid ##E3E6EB",
  borderRadius: "8px",
  boxShadow: "0px 7px 20px 0px rgba(40,41,61,0.08)",
  p: 4,
};

export default function UserFormModal() {
  const {
    setUsers,
    isModalOpen,
    setIsModalOpen,
    isEditing,
    setIsEditing,
    editingUser,
    setEditingUser,
  } = useContext(GlobalContext);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingUser("");
  };
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !role || !selectedAvatar)
      return alert("Please fill all fields");

    if (isEditing) {
      const updatedUser = {
        id: editingUser.id,
        name,
        username,
        email,
        role,
        avatar: selectedAvatar,
      };

      await updateUserApi(updatedUser)
        .then(() => getUsersApi())
        .then((data) => setUsers(data));

      handleClose();
      return;
    }
    const newUser = {
      name,
      username,
      email,
      role,
      avatar: selectedAvatar,
    };
    await addUserApi(newUser).then(() =>
      getUsersApi().then((data) => setUsers(data))
    );

    setName("");
    setUsername("");
    setEmail("");
    setRole("");
    setSelectedAvatar(null);
    handleClose();
  };

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  useEffect(() => {
    if (isEditing && editingUser) {
      setName(editingUser.name);
      setUsername(editingUser.username);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      setSelectedAvatar(editingUser.avatar);
    } else {
      setName("");
      setUsername("");
      setEmail("");
      setRole("");
      setSelectedAvatar(null);
    }
  }, [isEditing, editingUser]);
  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-buttonBlue text-white px-3 py-3 rounded-[4px] font-semibold text-sm flex items-center "
      >
        <AddIcon
          className="text-buttonBlue bg-white rounded-full mr-2 "
          style={{ fontSize: "15px" }}
        />
        Add New User
      </button>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            type="name"
            placeholder="Full Name"
            className="border-2 px-3 py-2 rounded-lg gap-2 w-full mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="username"
            placeholder="Username"
            className="border-2 px-3 py-2 rounded-lg gap-2 w-full mt-8"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 px-3 py-2 rounded-lg  w-full mt-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <FormControl
              size="small"
              className="w-full "
              style={{
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                marginTop: "32px",
              }}
            >
              <InputLabel
                id="demo-controlled-open-select-label"
                style={{ color: "#9ca3af", marginBottom: "8px" }}
              >
                Role
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={isSelectOpen}
                onClose={handleSelectClose}
                onOpen={handleSelectOpen}
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                style={{ border: "none", width: "100%" }}
              >
                <MenuItem value={"Contributor"}>Contributor</MenuItem>
                <MenuItem value={"Subscriber"}>Subscriber</MenuItem>
                <MenuItem value={"Author"}>Author</MenuItem>
                <MenuItem value={"Administrator"}>Administrator</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mt-8 mb-2 text-primary font-semibold text-base leading-[15.85px] py-2">
            Select avatar
          </div>

          <div className="flex justify-center space-x-3 cursor-pointer ">
            <img
              src={AvatarImage1}
              alt="avatar"
              className={`rounded-md ${
                selectedAvatar === AvatarImage1 ? "selected-avatar" : ""
              }`}
              onClick={() => setSelectedAvatar(AvatarImage1)}
            />

            <img
              src={AvatarImage2}
              alt="avatar"
              className={`rounded-md ${
                selectedAvatar === AvatarImage2 ? "selected-avatar" : ""
              }`}
              onClick={() => setSelectedAvatar(AvatarImage2)}
            />
            <img
              src={AvatarImage3}
              alt="avatar"
              className={`rounded-md ${
                selectedAvatar === AvatarImage3 ? "selected-avatar" : ""
              }`}
              onClick={() => setSelectedAvatar(AvatarImage3)}
            />
            <img
              src={AvatarImage4}
              alt="avatar"
              className={`rounded-md ${
                selectedAvatar === AvatarImage4 ? "selected-avatar" : ""
              }`}
              onClick={() => setSelectedAvatar(AvatarImage4)}
            />
            <img
              src={AvatarImage5}
              alt="avatar"
              className={`rounded-md ${
                selectedAvatar === AvatarImage5 ? "selected-avatar" : ""
              }`}
              onClick={() => setSelectedAvatar(AvatarImage5)}
            />
            <img
              src={AvatarImage6}
              alt="avatar"
              className={`rounded-md ${
                selectedAvatar === AvatarImage6 ? "selected-avatar" : ""
              }`}
              onClick={() => setSelectedAvatar(AvatarImage6)}
            />
          </div>
          <div className="justify-center flex items-center mt-6 -mb-3">
            <button
              onClick={handleCreateUser}
              className="bg-buttonBlue text-white px-3 py-3 rounded-[4px] font-medium text-sm flex "
            >
              {isEditing ? "Edit User" : "Create User"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
