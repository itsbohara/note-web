import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import NotesApp from "./layouts/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./app/routes/index";
import "simplebar-react/dist/simplebar.min.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // document.body.classList.add("_dark");
    document.body.classList.add("_light");
  }, []);

  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
