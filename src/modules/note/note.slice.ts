import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "client/axios";
//
import { objFromArray } from "utils/object";
import { omit, pull } from "lodash";
import { setNotice } from "app/redux/slices/notice";
import http from "client/axios";

// ---------------------------------------------------------------------
type IDSeparatedData = {
  byId: { [key: string]: any };
  allIds: string[];
};

export type NoteState = {
  isLoading: boolean;
  activeNote?: string | any;
  notes: IDSeparatedData;
  error: string | null;
  saved: boolean;
  last_saved?: any;
  writeMode: boolean;
};

const initialState: NoteState = {
  isLoading: true,
  error: null,
  notes: { byId: {}, allIds: [] },
  saved: true,
  writeMode: true,
};

const slice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // START LOADING
    stopLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET FOLDERS
    getNotesSuccess(state, action) {
      const notes = action.payload;

      state.notes.byId = objFromArray(notes);
      state.notes.allIds = Object.keys(state.notes.byId);
    },

    // GET FOLDER
    getNoteSuccess(state, action) {
      const note = action.payload;
      state.activeNote = note;
    },

    // ON UPLOAD NEW FILE
    onNewNote(state, action) {
      const newNote = action.payload;
      state.notes.byId[newNote.id] = newNote;
      state.notes.allIds.push(newNote.id);
    },

    onDeleteNote(state, action) {
      const noteID = action.payload;
      state.notes.byId = omit(state.notes.byId, [noteID]);
      state.notes.allIds = pull(state.notes.allIds, noteID);
    },

    onClearTrash(state) {
      state.notes.byId = {};
      state.notes.allIds = [];
    },

    onUpdateNote(state, action) {
      const note = action.payload;
      state.notes.byId[note.id] = note;
    },

    // on note changed and not
    onNoteSaveHandle(state, action) {
      state.saved = action.payload;
    },
    onUpdateLastSave(state, action) {
      state.last_saved = action.payload;
    },
    onWritingMode(state, action) {
      state.writeMode = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  onNoteSaveHandle,
  getNotesSuccess,
  getNoteSuccess,
  onNewNote,
  onDeleteNote,
  onUpdateNote,
  onUpdateLastSave,
  onWritingMode,
} = slice.actions;

// ----------------------------------------------------------------------

interface noteProps {
  trash?: boolean;
}
export function getNotes(props?: noteProps) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `/notes${props?.trash ? "?trash=true" : ""}`
      );
      dispatch(slice.actions.getNotesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
    dispatch(slice.actions.stopLoading());
  };
}

// ----------------------------------------------------------------------

// export function getNote(noteID) {
//   return async (dispatch, getState) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(`/directory/${noteID}`);
//       dispatch(slice.actions.getNoteSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

export function newNote(data) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/note/new`, data);
      dispatch(slice.actions.onNewNote(response.data));
      dispatch(slice.actions.getNoteSuccess(response.data));
      return response.data["id"];
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------

export function updateNote(id, data) {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`/note/${id}`, data);
      dispatch(slice.actions.onUpdateNote(response.data));
      dispatch(setNotice({ message: "Note updated." }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

// ----------------------------------------------------------------------

export function trashNote(noteID) {
  return async (dispatch) => {
    try {
      await axios.delete(`/note/${noteID}/trash`);
      dispatch(slice.actions.onDeleteNote(noteID));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

export function restoreTrashNote(noteID) {
  return async (dispatch) => {
    try {
      await axios.patch(`/note/${noteID}`, { trash: false });
      dispatch(slice.actions.onDeleteNote(noteID));
      dispatch(setNotice({ message: "Note restored!" }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

export function deleteNote(noteID) {
  return async (dispatch) => {
    try {
      await axios.delete(`/note/${noteID}`);
      dispatch(slice.actions.onDeleteNote(noteID));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

export function clearTrash() {
  return async (dispatch) => {
    try {
      await axios.delete("/trash");
      dispatch(slice.actions.onClearTrash());
      dispatch(setNotice({ message: "Trash cleared!" }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

// ----------------------------------------------------------------------
