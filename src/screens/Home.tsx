import { Box, Key, Text, useApp, useFocusManager, useInput } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
import { FC } from "react";
import {
  ScreenName,
  useAppContext,
  useAppDispatch,
} from "../components/AppProvider.js";
import {
  Focusable,
  useFocusContext,
  useIsFocused,
} from "../components/Focusable.js";
import { TextWithBG } from "../components/TextWithBG.js";
import { ColorScheme } from "../utils/constants.js";
import { getPrintableScreenName } from "../utils/helpers.js";

export const Home: FC = () => {
  const { screenList } = useAppContext();
  const appDispatch = useAppDispatch();
  const { exit } = useApp();
  const { focusNext, focusPrevious } = useFocusManager();

  const { active } = useFocusContext();
  function handleInput(input: string, key: Key) {
    if (key.return) {
      const activeScreenTab = screenList.find((name) => name === active);
      if (activeScreenTab) {
        appDispatch({ screen: activeScreenTab, type: "navigate" });
      }
    }

    if (key.downArrow) {
      focusNext();
    }
    if (key.upArrow) {
      focusPrevious();
    }

    if (input === "q") {
      exit();
    }
  }

  useInput(handleInput);

  return (
    <Box width="100%" height="100%" alignItems="center" flexDirection="column">
      <Gradient name="fruit">
        <BigText text="Unertia" font="block" />
      </Gradient>

      <TextWithBG color="white" bold backgroundColor="redBright">
        No active timer (todo)
      </TextWithBG>

      <Box
        flexDirection="column"
        gap={1}
        flexWrap="wrap"
        marginTop={2}
        flexGrow={1}
      >
        {screenList
          .filter((name) => name !== "Home")
          .map((name, ind) => (
            <ScreenTab key={name} name={name} index={ind} />
          ))}
      </Box>
      <Box alignSelf="flex-start">
        <Text color="gray">
          Use 'Tab' or Arrow Keys to move. Press 'q' to exit
        </Text>
      </Box>
    </Box>
  );
};

const ScreenTab: FC<{
  name: ScreenName;
  index: number;
}> = ({ name, index }) => {
  const id = name;
  const isFocused = useIsFocused(id);

  return (
    <Focusable id={id} autoFocus={index === 0}>
      <Text>
        {isFocused ? "⮞" : " "}{" "}
        <Text
          bold={isFocused}
          color={isFocused ? ColorScheme.primaryDark : "white"}
        >
          {getPrintableScreenName(name)}
        </Text>
      </Text>
    </Focusable>
  );
};
