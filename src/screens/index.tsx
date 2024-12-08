import { FC } from "react";
import { ScreenName } from "../components/AppProvider.js";
import { Home } from "./Home.js";
import { Timer } from "./Timer.js";

export const screens: Record<ScreenName, FC> = {
  Home,
  Timer,
};
