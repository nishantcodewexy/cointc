/// Components
import Markup from "./jsx/_views/_admin";
import ThemeContextProvider from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeContextProvider>
        {console.log("APP::READY")}
        <Markup />
      </ThemeContextProvider>
    </>
  );
};

export default App;
