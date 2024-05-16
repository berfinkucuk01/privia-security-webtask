import NavbarIcon from "../assets/Frame 3153.svg";
import { useContext } from "react";
import UserFormModal from "./UserFormModal";
import { GlobalContext } from "../context/GlobalContext";

function Navbar() {
  const { setActiveTab, activeTab } = useContext(GlobalContext);

  const MAP_TABS_BORDER = {
    "All Users": { width: "60", pos: "500" },
    Contributor: { width: "70", pos: "600" },
    Author: { width: "60", pos: "700" },
    Administrator: { width: "70", pos: "800" },
    Subscriber: { width: "70", pos: "920" },
  };

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
          className={` ${
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
        className={` bg-stone-300 w-screen h-[3px] left-0 absolute bottom-0 before:absolute before:w-[${MAP_TABS_BORDER[activeTab].width}px] before:h-[3px] before:left-[${MAP_TABS_BORDER[activeTab]?.pos}px] before:bg-buttonBlue`}
      ></div>
      <UserFormModal />
    </nav>
  );
}

export default Navbar;
