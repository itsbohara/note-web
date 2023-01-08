import { Icon } from "@iconify-icon/react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SplitPane from "react-split-pane";
import SimpleBar from "simplebar-react";
import IButton from "../../components/IconButton";

import "./container.css";
import NoteMenuBar from "../../modules/note/noteMenuBar";
import { useAppSelector, useAppDispatch } from "../../app/hooks/useApp";
import { useEffect } from "react";
import { getNotes, onUpdateLastSave } from "modules/note/note.slice";
import PreLoaderV1 from "../../components/PreLoader/index";
import { iterateObject } from "../../utils/object";
import { deleteNote, trashNote } from "../../modules/note/note.slice";
import dayjs from "dayjs";

function NotesAppContainer() {
  const dispath = useAppDispatch();
  const { notes, isLoading } = useAppSelector((state) => state.notes);
  const navigate = useNavigate();
  function handleNewNoteNavigation() {
    navigate("/notes/new");
  }

  useEffect(() => {
    dispath(getNotes());
  }, []);

  const isEmpty = false;

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.ctrlKey && e.altKey && e.code == "KeyN") {
        e.preventDefault();
        handleNewNoteNavigation();
      }
    };
  }, []);

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
  dispath(onUpdateLastSave(_notes[0].updatedAt));

  function handleNoteDelete(noteID) {
    // dispath(deleteNote(noteID));
    dispath(trashNote(noteID));
  }

  return (
    <div>
      <SplitPane split="vertical" minSize={250} maxSize={500} defaultSize={400}>
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
            <IButton
              icon={"material-symbols:post-add-rounded"}
              circular={true}
              variant="fill"
              color="green"
              onClick={handleNewNoteNavigation}
            />
          </div>
          <SimpleBar
            style={{
              height: "calc(100vh - 70px)",
              flexGrow: 1,
              flexWrap: "wrap",
            }}
          >
            {_notes.map((note) => (
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
                    onClick={() => handleNoteDelete(note.id)}
                  />
                </div>
              </NavLink>
            ))}
          </SimpleBar>
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
        <div className="note-editor h-1">
          <Outlet />
          <NoteMenuBar />
        </div>
      </SplitPane>
    </div>
  );
}

export default NotesAppContainer;
