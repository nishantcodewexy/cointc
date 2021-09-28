
/// Components
import Markup from "./jsx";

import { withResizeDetector } from "react-resize-detector";

import ThemeContextProvider from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeContextProvider >
      <Markup />
    </ThemeContextProvider>
  );
};

export default withResizeDetector(App);
