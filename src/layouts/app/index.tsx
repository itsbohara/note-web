import React from "react";
import SplitPane, { Pane } from "react-split-pane";
import Sidebar from "./sidebar";
import { useAppSelector, useAppDispatch } from "../../app/hooks/useApp";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearNotice } from "app/redux/slices/notice";
import uuidv4 from "../../utils/uuidv4";
import { Outlet } from "react-router-dom";

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

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
    <SplitPane split="vertical" minSize={250} maxSize={400} defaultSize={270}>
      <Sidebar />
      <Outlet />
    </SplitPane>
  );
}
