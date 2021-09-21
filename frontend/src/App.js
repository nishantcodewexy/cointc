import { routeArray } from "./routes";
import { useRoutes } from "./hooks/route";
import "./stylesheets/index.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme } from "./store/theme";

function App() {
  const Routes = useRoutes(routeArray);
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return <>{Routes}</>;
}

export default App;
