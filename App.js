import { StatusBar } from "expo-status-bar";
import React from "react";
import Home from "./pages/Home";

export default () => (
  <React.Fragment>
    <Home />
    <StatusBar style="auto" />
  </React.Fragment>
);
