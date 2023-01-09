import React from "react";

function EmptyContainer() {
  return (
    <div
      className="h-1 w-1"
      style={{
        display: "grid",
        background: "#f8f8f8",
        placeContent: "center",
        placeItems: "center",
      }}
    >
      <h3>Create a note</h3>
      <div className="flex" style={{ gap: 10 }}>
        <p style={{ background: "#fefefe", padding: '0 4px' }}>Ctrl</p>
        <p>+</p>
        <p style={{ background: "#fefefe", padding: '0 4px' }}>Alt</p>
        <p>+</p>
        <p style={{ background: "#fefefe", padding: '0 4px' }}>N</p>
      </div>
    </div>
  );
}

export default EmptyContainer;
