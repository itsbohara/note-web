import React from "react";

function EmptyContainer() {
  return (
    <div
      className="h-1 w-1"
      style={{
        display: "grid",
        background: "#f8f8f8",
        placeContent: "center",
      }}
    >
      <h5>Create a note</h5>
    </div>
  );
}

export default EmptyContainer;
