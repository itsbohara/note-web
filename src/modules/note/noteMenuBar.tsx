import { Icon } from "@iconify-icon/react";
import React from "react";
import "./menu-bar.css";
import IButton from "../../components/IconButton";
import { useAppSelector } from "app/hooks/useApp";
import dayjs from "dayjs";

function NoteMenuBar() {
  const { saved, last_saved } = useAppSelector((state) => state.notes);
  return (
    <div className="menu-bar">
      <div></div>
      <div
        className="flex"
        style={{
          alignItems: "stretch",
          justifyContent: "flex-end",
          alignSelf: "stretch",
        }}
      >
        <div className="last-synced">
          {saved && (
            // <span data-testid="last-synced-date">2:30 PM on 01/08/2023</span>
            <span data-testid="last-synced-date">
              {dayjs(new Date(last_saved ?? "")).format("LT on L")}
            </span>
          )}
          {!saved && <span>Unsaved</span>}
        </div>
        <button>
          <Icon icon="ic:outline-sync" height="20" />
        </button>
        <button>
          <Icon icon="material-symbols:settings" height="20" />
        </button>
      </div>
    </div>
  );
}

export default NoteMenuBar;
