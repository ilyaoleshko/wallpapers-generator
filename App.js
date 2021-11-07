import { StatusBar } from "expo-status-bar";
import Home from "./pages/Home";

export default () => (
  <React.Fragment>
    <Home />
    <StatusBar style="auto" />
  </React.Fragment>
);
