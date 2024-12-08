import { FC } from "react";
import { ScreenName } from "../components/AppProvider.js";
import { Connected_Devices } from "./Connected_Devices.js";
import { Home } from "./Home.js";
import { Pair_A_New_Device } from "./Pair_A_New_Device.js";
import { Timer } from "./Timer.js";

export const screens: Record<ScreenName, FC> = {
  Home,
  Timer,
  Connected_Devices,
  Pair_A_New_Device,
};
