/// Components
import Markup from "./jsx";
import ThemeContextProvider from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeContextProvider>
      <Markup />
    </ThemeContextProvider>
  );
};

export default App;
