import { Box, Text } from "ink";
import { FC } from "react";
import { Focusable, useIsFocused } from "./Focusable.js";

export const Header: FC = () => {
  return (
    <Box>
      <BackButton />
    </Box>
  );
};
export const BACK_BTN_ID = "BACK";
function BackButton() {
  const isFocused = useIsFocused(BACK_BTN_ID);

  return (
    <Focusable id={BACK_BTN_ID}>
      <Text bold={isFocused} color={isFocused ? "red" : "gray"}>
        {"< Home"}
      </Text>
    </Focusable>
  );
}
