import React from "react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import IButton from "../IconButton";

function NoteItem({ note, onTrash }) {
  function trashNote(e) {
    e.preventDefault();
    onTrash(note.id);
  }
  return (
    <NavLink to={`/notes/${note.id}`} className="note_item">
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
    </NavLink>
  );
}

export default NoteItem;
