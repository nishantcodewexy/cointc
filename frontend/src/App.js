import React, { useEffect } from "react";

/// Components
import Markup from "./jsx";

/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

import { withResizeDetector } from "react-resize-detector";

import ThemeContextProvider from "./context/ThemeContext";

const App = ({ width }) => {
  const body = document.querySelector("body");
  return (
    <ThemeContextProvider>
      <Markup />
    </ThemeContextProvider>
  );
};

export default App;
