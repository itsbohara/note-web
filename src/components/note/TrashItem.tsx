import React from "react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import IButton from "../IconButton";
import { getNoteSuccess } from "modules/note/note.slice";
import { useAppDispatch } from "../../app/hooks/useApp";

function TrashNoteItem({ note, onDelete, onRestore }) {
  const dispath = useAppDispatch();
  function handleItemClick() {
    dispath(getNoteSuccess(note));
  }
  function restoreNote(e) {
    e.stopPropagation();
    onRestore(note.id);
  }
  function deleteNote(e) {
    e.stopPropagation();
    onDelete(note.id);
  }
  return (
    <div onClick={handleItemClick} className="note_item pointer">
      <h4>{note.title}</h4>
      {/* <p>note body first line ..... </p> */}
      <span>Last updated: {dayjs(note.updatedAt).fromNow(true)}</span>
      <div className="note-menu trash">
        <IButton
          icon={"ic:baseline-restore-from-trash"}
          circular={true}
          variant="fill"
          color="green"
          size="small"
          onClick={restoreNote}
        />
        <IButton
          icon={"material-symbols:delete"}
          circular={true}
          variant="fill"
          color="red"
          size="small"
          onClick={deleteNote}
        />
      </div>
    </div>
  );
}

export default TrashNoteItem;
