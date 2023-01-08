import React from "react";
import IButton from "./IconButton";
import useAuth from "../app/hooks/useAuth";

function MyAccount() {
  const { user, logout } = useAuth();
  return (
    <div
      className="flex ai-center"
      style={{
        gap: 10,
        background: "#f2f2f2",
        border: "1px solid #d1d1d1",
        borderRadius: 4,
      }}
    >
      <img src="/static/logo/note-logo.png" alt="" height={40} />
      <h4 style={{ flexGrow: 1 }}>{user.name}</h4>
      <IButton
        icon="material-symbols:logout-rounded"
        circular
        onClick={logout}
      />
    </div>
  );
}

export default MyAccount;
