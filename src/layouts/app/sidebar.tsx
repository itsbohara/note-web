import { Icon } from "@iconify-icon/react";
import MyAccount from "components/MyAccount";
import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import IButton from "../../components/IconButton";

import "./sidebar.css";
function Sidebar() {
  const notify = () => toast("Feature not implemented!");
  return (
    <div className="sidebar h-1">
      <MyAccount />
      <div className="flex">
        <div className="flex" style={{ marginLeft: "auto" }}>
          {/* <IButton
            icon={"ic:outline-sync"}
            circular={true}
            onClick={(e) => notify()}
          /> */}
          {/* <IButton icon={"ic:outline-sync"} circular={true} /> */}
        </div>
      </div>
      <ul>
        <li>
          <NavLink to={"/notes"} className="flex">
            <Icon icon="tabler:notes" height="25" />
            All Notes
          </NavLink>
        </li>
        <li>
          <NavLink to={"/favorites"} className="flex">
            <Icon icon="ic:outline-favorite-border" height="25" />
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to={"/trash"} className="flex">
            <Icon icon="ic:outline-delete-sweep" height="25" />
            Trash
          </NavLink>
        </li>
        <li>
          <NavLink to={"/activity"} className="flex">
            <Icon icon="fluent:shifts-activity-24-filled" height="25" />
            Activity
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
