import Logo from "components/Logo";
import React from "react";
import { Outlet } from "react-router-dom";

function LogoOnlyLayout() {
  return (
    <>
      <div style={{ marginTop: 20, marginLeft: 20, position: "absolute" }}>
        <Logo appName />
      </div>

      <Outlet />
    </>
  );
}

export default LogoOnlyLayout;
