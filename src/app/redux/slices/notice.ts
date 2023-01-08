import { createSlice } from "@reduxjs/toolkit";
import { toast, TypeOptions } from "react-toastify";
type noticeInput = {
  type: "notification";
  message: string;
  variant: TypeOptions;
};

interface State {
  message?: string;
  variant?: TypeOptions;
  preventDuplicate: boolean;
}

const initialState: State = {
  message: undefined,
  variant: undefined,
  preventDuplicate: false,
};

interface NoticePayload {
  message: string | any;
  variant?: TypeOptions;
  preventDuplicate?: boolean;
}
// handle client level error
const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotice: (state, action: { payload: NoticePayload }) => {
      const { message, variant, preventDuplicate } = action.payload;
      state.message = message;
      state.variant = variant ?? "success";
      state.preventDuplicate = preventDuplicate ?? false;
    },
    setInfoNotice: (state, action: { payload: NoticePayload }) => {
      const { message, preventDuplicate } = action.payload;
      state.message = message;
      state.variant = "info";
      state.preventDuplicate = preventDuplicate ?? false;
    },
    setErrorNotice: (state, action: { payload: NoticePayload }) => {
      const { message, preventDuplicate } = action.payload;
      state.message = message;
      state.variant = "error";
      state.preventDuplicate = preventDuplicate ?? false;
    },
    setWarningNotice: (state, action: { payload: NoticePayload }) => {
      const { message, preventDuplicate } = action.payload;
      state.message = message;
      state.variant = "warning";
      state.preventDuplicate = preventDuplicate ?? false;
    },
    clearNotice: () => {
      return {
        message: undefined,
        variant: undefined,
        preventDuplicate: false,
      };
    },
  },
});

const { reducer, actions } = noticeSlice;

export const {
  setNotice,
  setErrorNotice,
  setInfoNotice,
  setWarningNotice,
  clearNotice,
} = actions;
export default reducer;
