import { Icon } from "@iconify-icon/react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import IButton from "../../components/IconButton";

import "./container.css";
import NoteMenuBar from "../../modules/note/noteMenuBar";
import { useAppSelector, useAppDispatch } from "../../app/hooks/useApp";
import { useEffect } from "react";
import {
  getNotes,
  onUpdateLastSave,
  onWritingMode,
  restoreTrashNote,
} from "modules/note/note.slice";
import PreLoaderV1 from "../../components/PreLoader/index";
import { iterateObject } from "../../utils/object";
import {
  deleteNote,
  trashNote,
  clearTrash,
} from "../../modules/note/note.slice";
import dayjs from "dayjs";
import NoteItem from "components/note/NoteItem";
import TrashNoteItem from "components/note/TrashItem";
import { Allotment } from "allotment";
import { getNoteSuccess } from "modules/note/note.slice";

function NotesAppContainer() {
  const dispath = useAppDispatch();
  const { notes, isLoading, writeMode } = useAppSelector(
    (state) => state.notes
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTrash = pathname.includes("/trash");
  const isFavorites = pathname.includes("/favorites");
  function handleNewNoteNavigation() {
    if (!writeMode) dispath(onWritingMode(true));
    navigate("/notes/new");
  }

  useEffect(() => {
    if (isFavorites) dispath(getNotes({ favorite: true }));
    else if (isTrash) dispath(getNotes({ trash: true }));
    else dispath(getNotes());
  }, [pathname]);

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.ctrlKey && e.altKey && e.code == "KeyN") {
        e.preventDefault();
        handleNewNoteNavigation();
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    // clear active note, if notes lenght is less than 1
    if (notes.allIds.length < 1) dispath(getNoteSuccess(null));
  }, [notes]);

  if (isLoading) {
    return (
      <div className="h-1" style={{ display: "grid", placeContent: "center" }}>
        <PreLoaderV1 />
      </div>
    );
  }

  const _notes = iterateObject(notes.byId).sort(
    (a, b) =>
      new Date(b?.updatedAt).getTime() - new Date(a?.updatedAt).getTime()
  );

  // last note updated time
  if (_notes.length > 0) dispath(onUpdateLastSave(_notes[0].updatedAt));

  function handleNoteTrash(noteID) {
    dispath(trashNote(noteID));
  }

  function handleNoteDelete(noteID) {
    dispath(deleteNote(noteID));
  }
  function handleNoteRestore(noteID) {
    dispath(restoreTrashNote(noteID));
  }

  function handleTrashClean() {
    dispath(clearTrash());
  }

  const isEmpty = notes.allIds.length < 1;

  return (
    <Allotment>
      <Allotment.Pane minSize={250} maxSize={500} preferredSize={400}>
        <div className="note-list-container h-1">
          <div
            className="flex"
            style={{
              alignItems: "center",
              gap: 10,
              justifyContent: "space-around",
              borderColor: "#dfe1e4",
              borderBottomWidth: 1,
              borderStyle: "solid",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              padding: "10px 10px",
            }}
          >
            <div className="search-container">
              <Icon icon="ic:round-search" />
              <input type="text" placeholder="Search" />
              <Icon icon="gg:sort-az" />
            </div>
            {!isTrash && (
              <IButton
                icon={"material-symbols:post-add-rounded"}
                circular={true}
                variant="fill"
                color="green"
                onClick={handleNewNoteNavigation}
              />
            )}
            {isTrash && notes.allIds.length > 0 && (
              <IButton
                icon={"material-symbols:delete"}
                circular={true}
                variant="fill"
                color="red"
                onClick={handleTrashClean}
              />
            )}
          </div>
          {!isEmpty && (
            <SimpleBar
              style={{
                height: "calc(100vh - 70px)",
                flexGrow: 1,
                flexWrap: "wrap",
              }}
            >
              {_notes.map((note) =>
                isTrash ? (
                  <TrashNoteItem
                    note={note}
                    onDelete={handleNoteDelete}
                    onRestore={handleNoteRestore}
                  />
                ) : (
                  <NoteItem note={note} onTrash={handleNoteTrash} />
                )
              )}
            </SimpleBar>
          )}
          {isEmpty && (
            <p
              className="empty-items-list flex h-1"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No items.
            </p>
          )}
        </div>
      </Allotment.Pane>
      <Allotment.Pane className="w-1">
        <div className="note-editor h-1">
          <Outlet />
          <NoteMenuBar />
        </div>
      </Allotment.Pane>
    </Allotment>
  );
}

export default NotesAppContainer;
