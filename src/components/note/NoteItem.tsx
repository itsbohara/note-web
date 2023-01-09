import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import IButton from "../IconButton";
import "./noteItem.css";
import { useState } from "react";
import useOutsideClick from "../../app/redux/useOutsideClick";
import ContextMenu from "./contextMenu";
import { useAppDispatch } from "../../app/hooks/useApp";
import { updateNote } from "modules/note/note.slice";
import { Icon } from "@iconify-icon/react";

function NoteItem({ note, onTrash }) {
  const dispath = useAppDispatch();
  const [ctxMenu, setCtxMenu] = useState<any>(null);

  const { pathname } = useLocation();
  const favActive = pathname.includes("/favorites");

  function trashNote(e) {
    e.preventDefault();
    handleCtxClose();
    onTrash(note.id);
  }
  const handleCtxMenu = (e) => {
    e.preventDefault();
    setCtxMenu(e);
  };
  const handleCtxClose = () => {
    setCtxMenu(null);
  };

  function handleToggleFavorite() {
    handleCtxClose();
    dispath(updateNote(note.id, { favorite: !note.favorite }));
  }

  return (
    <NavLink
      to={`/${favActive ? "favorites" : "notes"}/${note.id}`}
      className="note_item"
      onContextMenu={handleCtxMenu}
    >
      {note.favorite && (
        <div className="fav" style={{ position: "absolute", left: 2 }}>
          <Icon icon="material-symbols:star-rounded" />
        </div>
      )}
      <h4>{note.title}</h4>
      {/* <p>note body first line ..... </p> */}
      <span>Last updated: {dayjs(note.updatedAt).fromNow(true)}</span>
      <div className="note-menu">
        <IButton
          icon={"material-symbols:delete"}
          circular={true}
          variant="outline"
          color="red"
          size="small"
          onClick={trashNote}
        />
      </div>

      {ctxMenu && (
        <ContextMenu
          ctxMenu={ctxMenu}
          onCtxClose={handleCtxClose}
          onTrash={trashNote}
          favorite={note.favorite ?? false}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </NavLink>
  );
}

export default NoteItem;
