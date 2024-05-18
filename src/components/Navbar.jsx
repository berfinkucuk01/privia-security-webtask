import NavbarIcon from "../assets/Frame 3153.svg";
import { useContext } from "react";
import UserFormModal from "./UserFormModal";
import { GlobalContext } from "../context/GlobalContext";
const MAP_TABS_BORDER = {
  "All Users": { width: "35px", pos: "505px" },
  Contributor: { width: "40px", pos: "616px" },
  Author: { width: "35px", pos: "715px" },
  Administrator: { width: "45px", pos: "815px" },
  Subscriber: { width: "45px", pos: "935px" },
};
function Navbar() {
  const { setActiveTab, activeTab } = useContext(GlobalContext);

  return (
    <nav className="flex justify-between items-center p-5  relative">
      <img src={NavbarIcon} alt="navbar-icon" />
      <ul className="flex space-x-10 text-primary leading-4 text-sm  font-semibold ">
        <li
          className={`${
            activeTab === "All Users" ? "text-buttonBlue" : ""
          } cursor-pointer`}
          onClick={() => setActiveTab("All Users")}
        >
          All Users
        </li>
        <li
          className={`  ${
            activeTab === "Contributor" ? " text-buttonBlue" : ""
          } cursor-pointer `}
          onClick={() => setActiveTab("Contributor")}
        >
          Contributor
        </li>
        <li
          className={`${
            activeTab === "Author" ? " text-buttonBlue" : ""
          } cursor-pointer `}
          onClick={() => setActiveTab("Author")}
        >
          Author
        </li>
        <li
          className={`${
            activeTab === "Administrator" ? " text-buttonBlue" : ""
          } cursor-pointer `}
          onClick={() => setActiveTab("Administrator")}
        >
          Administrator
        </li>
        <li
          className={` ${
            activeTab === "Subscriber" ? " text-buttonBlue" : ""
          } cursor-pointer `}
          onClick={() => setActiveTab("Subscriber")}
        >
          Subscriber
        </li>
      </ul>
      <div
        className={`bg-stone-300 w-screen h-[3px] right-0 absolute bottom-0 transition-all duration-500`}
      ></div>
      <div
        style={{
          width: MAP_TABS_BORDER[activeTab].width,
          height: "3px",
          backgroundColor: "#2940D3",
          position: "absolute",
          bottom: "0",
          left: MAP_TABS_BORDER[activeTab].pos,
          transition: "all 0.5s",
        }}
      ></div>
      <UserFormModal />
    </nav>
  );
}

export default Navbar;
