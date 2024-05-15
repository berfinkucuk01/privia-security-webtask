import NavbarIcon from "../assets/Frame 3153.svg";

import { useState } from "react";
import UserFormModal from "./UserFormModal";

function Navbar() {
  const [activeTab, setActiveTab] = useState("All Users");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    //duruma gore listelenme de burada yapılacak ...
  };

  return (
    <nav className="flex justify-between items-center p-5 border-b-[3px] border-stone-300">
      <img src={NavbarIcon} alt="navbar-icon" />
      <ul className="flex space-x-10 text-primary leading-4 text-[13px] font-semibold">
        <li
          className={`border-b-[3px] ${
            activeTab === "All Users" ? "border-buttonBlue text-buttonBlue" : ""
          } cursor-pointer`}
          onClick={() => handleTabClick("All Users")}
        >
          All Users
        </li>
        <li
          className={`border-b-[3px] ${
            activeTab === "Contributor"
              ? "border-buttonBlue text-buttonBlue"
              : ""
          } cursor-pointer `}
          onClick={() => handleTabClick("Contributor")}
        >
          Contributor
        </li>
        <li
          className={`border-b-[3px] ${
            activeTab === "Author" ? "border-buttonBlue text-buttonBlue" : ""
          } cursor-pointer `}
          onClick={() => handleTabClick("Author")}
        >
          Author
        </li>
        <li
          className={`border-b-[3px] ${
            activeTab === "Administrator"
              ? "border-buttonBlue text-buttonBlue"
              : ""
          } cursor-pointer `}
          onClick={() => handleTabClick("Administrator")}
        >
          Administrator
        </li>
        <li
          className={`border-b-[3px] ${
            activeTab === "Subscriber"
              ? "border-buttonBlue text-buttonBlue"
              : ""
          } cursor-pointer `}
          onClick={() => handleTabClick("Subscriber")}
        >
          Subscriber
        </li>
      </ul>
      <UserFormModal />
    </nav>
  );
}

export default Navbar;
