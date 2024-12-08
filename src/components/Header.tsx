import { Text } from "ink";
import { FC } from "react";
import { ColorScheme } from "../utils/constants.js";

export type HeaderProps = {
  screenName: string;
};
export const Header: FC<HeaderProps> = ({ screenName }) => {
  return (
    <Text bold color={ColorScheme.primary}>
      ❱ {screenName}
    </Text>
  );
};
