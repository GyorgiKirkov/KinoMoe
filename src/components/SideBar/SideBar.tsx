import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/user-store";
import sidebarStyles from "./SideBar.module.css";
import userPhoto from "../../../public/img/user-photo.png";
import {
  faHouse,
  faUser,
  faGear,
  faVideo,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: React.FC = () => {
  const setUser = useUserStore((state: any) => state.setUser);
  const user = useUserStore((state: any) => state.user);

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", "");
  };

  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const userImage = user && user.profileImage ? user.profileImage : userPhoto;

  return (
    <div
      className={`${sidebarStyles.sidebar} ${
        isSidebarActive ? sidebarStyles.active : ""
      }`}
    >
      <div className={sidebarStyles.head} onClick={toggleSidebar}>
        <div className={sidebarStyles.userImg}>
          <img src={userImage} alt="User" />
        </div>
        <p className={`text-white ${sidebarStyles.name}`}>
          {user && user.fullname ? `Welcome ${user.fullname}` : "Welcome Guest"}
        </p>
      </div>
      <div
        className={`mt-5 ${sidebarStyles.menu} ${
          isSidebarActive ? "" : sidebarStyles.hidden
        }`}
      >
        <Link to={`/movies`}>
          <button className={sidebarStyles.button} title="Home">
            <FontAwesomeIcon icon={faHouse} />
          </button>
        </Link>

        <Link to={`/logIn/Profile/${user.id}`}>
          <button className={sidebarStyles.button} title="Profile">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </Link>
        <Link to={`/Community/${user.id}`}>
          <button className={sidebarStyles.button} title="Community">
            <FontAwesomeIcon icon={faComments} />
          </button>
        </Link>

        <Link to="/movies">
          <button className={sidebarStyles.button} title="Favorite Movies">
            <FontAwesomeIcon icon={faVideo} />
          </button>
        </Link>

        <button className={`mb-5 ${sidebarStyles.button}`} title="Settings">
          <FontAwesomeIcon icon={faGear} />
        </button>
        <div className={sidebarStyles.buttonLast}>
          <Link to="/">

            <button
              className={`mt-4 ${sidebarStyles.button}`}
              title="Logout"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOut} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
