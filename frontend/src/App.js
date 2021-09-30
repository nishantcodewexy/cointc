/// Components
import Markup from "./jsx";
import ThemeContextProvider from "./context/ThemeContext";
require('dotenv').config();

const App = () => {
  return (
    <ThemeContextProvider>
      <Markup />
    </ThemeContextProvider>
  );
};

export default App;
