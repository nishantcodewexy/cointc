import Admin from "./admin";
import Guest from "./guest";
import { BrowserRouter as Router } from "react-router-dom";

export default function Markup() {
  return (
    <Router basename="/">
      <Guest />
      <Admin />
    </Router>
  );
}
