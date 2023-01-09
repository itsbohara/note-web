import { Icon } from "@iconify-icon/react";
import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useOutsideClick from "../../app/redux/useOutsideClick";

function ContextMenu({
  ctxMenu,
  onCtxClose,
  onTrash,
  favorite,
  onToggleFavorite,
}) {
  const [ctxMenuRoot, setCtxMenuContainer] = useState<HTMLDivElement>(
    document.createElement("div")
  );

  const ctxRef = useOutsideClick(onCtxClose);

  useEffect(() => {
    const ctx = ctxMenu;
    const clickX = ctx.clientX;
    const clickY = ctx.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    // window.document.body.offsetHeight;
    // const rootW = this.root.offsetWidth;
    const rootW = ctxRef.current?.offsetWidth ?? 0;
    const rootH = ctxRef.current?.offsetHeight ?? 0;

    const right = screenW - clickX > rootW;
    const left = !right;
    const top = screenH - clickY > rootH;
    const bottom = !top;

    const root = ctxRef.current!;

    if (right) {
      root.style.left = `${clickX + 5}px`;
    }

    // if (left) {
    //   //   root.style.left = `${clickX - rootW + 275}px`;
    // }
    if (top) {
      root.style.top = `${clickY + 5}px`;
    }
    // if (bottom) {
    //   //   root.style.top = `${clickY - rootH - 5}px`;
    // }
  }, [ctxRef]);

  useEffect(() => {
    document.getElementById("root")?.appendChild(ctxMenuRoot);
    return () => {
      document.getElementById("root")?.removeChild(ctxMenuRoot);
    };
  }, [ctxMenuRoot]);

  const menuContainer = (
    <div ref={ctxRef as any} className="ctx-menu" style={{ padding: 10 }}>
      <ul className="menu-list">
        <li className="menu-item">
          <button className="menu-button" onClick={onToggleFavorite}>
            <Icon icon="material-symbols:star-outline-rounded" width="20" />
            {favorite ? "Remove favorite" : "Mark as favorite"}
          </button>
        </li>
        <li className="menu-item">
          <button className="menu-button" onClick={() => {}}>
            <Icon icon="material-symbols:push-pin-outline" width="20" />
            Pin to top
          </button>
        </li>
        {/* <li className="menu-item">
          <button className="menu-button" onClick={() => {}}>
            <Icon icon="material-symbols:download" width="20" />
            Download
          </button>
        </li> */}
      </ul>
      <ul className="menu-list">
        <li className="menu-item">
          <button className="menu-button" onClick={onTrash}>
            <Icon icon="material-symbols:delete" width="20" />
            Move to trash
          </button>
        </li>
      </ul>
    </div>
  );

  return ReactDOM.createPortal(menuContainer, ctxMenuRoot);
}

export default ContextMenu;
