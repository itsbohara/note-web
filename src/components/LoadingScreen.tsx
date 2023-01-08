import React from "react";
import PreLoaderV1 from "./PreLoader/index";

function LoadingScreen() {
  return (
    <div className="h-1" style={{ display: "grid", placeContent: "center" }}>
      <PreLoaderV1 />
    </div>
  );
}

export default LoadingScreen;
