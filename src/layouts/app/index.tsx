import React from "react";
import Sidebar from "./sidebar";
import { useAppSelector, useAppDispatch } from "../../app/hooks/useApp";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearNotice } from "app/redux/slices/notice";
import uuidv4 from "../../utils/uuidv4";
import { Outlet } from "react-router-dom";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

import { Allotment } from "allotment";
import "allotment/dist/style.css";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function NotesApp() {
  // handle app notifications
  const {
    message,
    variant: type,
    preventDuplicate,
  } = useAppSelector((state) => state.notice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      toast(message, { type, toastId: preventDuplicate ? uuidv4() : message });
      dispatch(clearNotice());
    }
  }, [message]);

  return (
    // <div className="flex h-1 w-1">
    <Allotment>
      <Allotment.Pane minSize={250} preferredSize={270} maxSize={400}>
        <Sidebar />
      </Allotment.Pane>
      <Allotment.Pane className="w-1">
        <Outlet />
      </Allotment.Pane>
    </Allotment>
  );
}
