import React from "react";
import { CSSProperties } from "react";

interface logoProps {
  height?: number;
  width?: number;
  appName?: boolean;
  sx?: CSSProperties;
}

function Logo({ height, width, appName = false, sx }: logoProps) {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", ...sx }}>
      <img
        src="/static/logo/note-logo.png"
        alt="Note app logo"
        height={height ?? 60}
      />
      {appName && <h2>Notes App</h2>}
    </div>
  );
}

export default Logo;
