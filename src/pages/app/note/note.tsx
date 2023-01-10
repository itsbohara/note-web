import IButton from "components/IconButton";
import React, { useCallback, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import "./note.css";

//

import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";

import InlineCode from "@editorjs/inline-code";
// import SimpleImage from "@editorjs/simple-image";
// import Image from "@editorjs/image";
// import Raw from "@editorjs/raw";

// import { createReactEditorJS } from "react-editor-js";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/useApp";
import {
  getNoteSuccess,
  newNote,
  onNoteSaveHandle,
  onWritingMode,
} from "modules/note/note.slice";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updateNote } from "../../../modules/note/note.slice";
import EmptyContainer from "../emptyContainer";
import SimpleBar from "simplebar-react";

const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  // image: Image,
  // raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  // delimiter: Delimiter,
  inlineCode: InlineCode,
  // simpleImage: SimpleImage,
};
// const ReactEditorJS = createReactEditorJS();

function NoteContainer() {
  const { activeNote } = useAppSelector((state) => state.notes);
  const { pathname } = useLocation();
  const isTrash = pathname.includes("/trash");
  const isNewNote = pathname === "/notes/new";

  // return empty note container if its trash/fav note view
  if (isTrash && !activeNote) return <EmptyContainer />;

  return <NoteViewEdit isNewNote={isNewNote} isTrash={isTrash} />;
}

export default NoteContainer;

function NoteViewEdit({ isNewNote, isTrash }) {
  const dispath = useAppDispatch();

  const { activeNote, saved, notes, writeMode } = useAppSelector(
    (state) => state.notes
  );

  const [title, setTitle] = useState("");
  const [note, setNote] = useState<any>({});

  const editorCore = useRef<any>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { noteID } = useParams();

  const [loading, setLoading] = useState(true);

  const [editor, setEditor] = useState<EditorJS | any>(undefined);

  // const handleInitialize = useCallback((instance) => {
  //   editorCore.current = instance;
  // }, []);

  async function handleEditorChange(e) {
    const noteData = await e?.saver?.save();
    setNote(noteData);
  }

  function handleTitleChange(value) {
    setTitle(value);
    // if(activeNote && )
    // dispath(onNoteSaveHandle(true))
  }

  async function handleSaveNote() {
    const data = { title: title.trim(), body: JSON.stringify(note) };
    if (!noteID) {
      const _newNoteId = await dispath(newNote(data));
      navigate(`/notes/${_newNoteId}`);
    } else {
      await dispath(updateNote(noteID, data));
    }
    dispath(onNoteSaveHandle(true));
  }

  useEffect(() => {
    // if(title.trim() !== '')
    const empty =
      title === "" && Object.keys(note["blocks"] ?? note).length < 1;
    if (!activeNote) dispath(onNoteSaveHandle(empty));
    if (activeNote) {
      const titleChanged = title !== activeNote.title;
      const noteChanged = JSON.stringify(note) !== activeNote.body;
      dispath(onNoteSaveHandle(!titleChanged && !noteChanged));
    }
  }, [title, note]);

  useEffect(() => {
    if (!noteID && !isTrash) {
      editorCore.current?.clear();
      dispath(getNoteSuccess(null));
      if (isNewNote) {
        titleRef.current?.focus();
        setLoading(false);
      }
    }
    if (noteID) {
      const _note = notes.byId[noteID];
      if (!_note) navigate("/");
      dispath(getNoteSuccess(_note));
    }
    return () => {
      setTitle((preState) => (!noteID ? preState : ""));
      setNote({});
      setLoading(true);
    };
  }, [noteID]);

  useEffect(() => {
    if (!isTrash) return;

    return () => {
      dispath(getNoteSuccess(null));
    };
  }, [isTrash]);

  useEffect(() => {
    if (!activeNote) return;
    setTitle(activeNote.title);
    if (!editor) return;
    let noteData = { blocks: [] };
    try {
      noteData = JSON.parse(activeNote.body);
      setNote(noteData);
      editor?.isReady.then(() => editor.render(noteData));
    } catch (error) {
      console.warn("failed to load note");
    }
    // setLoading(false);
  }, [activeNote, editor]);

  useEffect(() => {
    if (loading) return;
    // save shortcut
    document.addEventListener("keydown", onSaveShortCutKey);
    return () => {
      document.removeEventListener("keydown", onSaveShortCutKey);
    };
  }, [noteID, title, note, loading]);

  function onSaveShortCutKey(e) {
    if (e.ctrlKey && e.code == "KeyS") {
      e.preventDefault();
      handleSaveNote();
    }
  }

  useEffect(() => {
    try {
      var _editor = new EditorJS({
        holder: "noteEditor",
        tools: EDITOR_JS_TOOLS,
        data: note,
        placeholder: "Write your note here ...",
        onChange: handleEditorChange,
        readOnly: !writeMode || isTrash,
      });
      setEditor(_editor);
    } catch (er) {
      console.warn("editor load failed");
    }
    return () => {
      setEditor(undefined);
    };
  }, []);

  useEffect(() => {
    titleRef.current!.disabled = !writeMode || isTrash;

    if (!editor) return;

    editor.isReady.then(() => {
      if (writeMode && editor.readOnly?.isEnabled) {
        editor.readOnly.toggle();
      } else if (!writeMode && !editor.readOnly?.isEnabled) {
        editor.readOnly.toggle();
      }
    });
  }, [writeMode]);

  return (
    <div className="note-container flex-1 h-1">
      <div className="editor-header flex">
        <input
          ref={titleRef}
          type="text"
          placeholder="Untitled note"
          className="flex-1 note_title"
          autoFocus
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        <nav className="flex" style={{ gap: 5 }}>
          {writeMode && !isTrash && (
            <IButton
              icon="mdi:progress-tick"
              circular
              size="small"
              onClick={handleSaveNote}
            />
          )}
          {!isTrash && (
            <IButton icon="eos-icons:push-pin-outlined" circular size="small" />
          )}
          <IButton icon="majesticons:maximize" circular size="small" />
        </nav>
      </div>
      <div className="editor w-1">
        <SimpleBar
          style={{
            height: "calc(100vh - 120px)",
            flexGrow: 1,
            flexWrap: "wrap",
          }}
        >
          <div id="noteEditor"></div>
          {!loading && (
            // <ReactEditorJS
            //   readOnly={!writeMode}
            //   onInitialize={handleInitialize}
            //   onChange={handleEditorChange}
            //   defaultValue={note}
            //   tools={EDITOR_JS_TOOLS}
            //   placeholder="Write your note here ..."
            // />
            <></>
          )}
        </SimpleBar>
      </div>
    </div>
  );
}
