import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import MainScreen from "../MainScreen";

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
