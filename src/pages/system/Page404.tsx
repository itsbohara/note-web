import React from "react";
import { NavLink } from "react-router-dom";

function Page404() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>404 - Invalid page</h2>
      <p>The page you have requrested is not exists!</p>
      <button>
        <NavLink to={"/"}>Home</NavLink>
      </button>
    </div>
  );
}

export default Page404;
