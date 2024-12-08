import { Box, Key, Text, useInput } from "ink";
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

export const Home: FC = () => {
  const { screenList } = useAppContext();
  const appDispatch = useAppDispatch();

  const { active } = useFocusContext();
  function handleInput(_input: string, key: Key) {
    if (key.return) {
      const activeScreenTab = screenList.find((name) => name === active);
      if (activeScreenTab) {
        appDispatch({ screen: activeScreenTab, type: "navigate" });
      }
    }
  }

  useInput(handleInput);

  return (
    <Box width="100%" height="100%" alignItems="center" flexDirection="column">
      <Gradient name="fruit">
        <BigText text="Unertia" font="block" />
      </Gradient>

      <TextWithBG color="white" bold backgroundColor="redBright">
        No active timer
      </TextWithBG>

      <Box flexDirection="row" gap={4} flexWrap="wrap" marginTop={2}>
        {screenList
          .filter((name) => name !== "Home")
          .map((name, ind) => (
            <ScreenTab key={name} name={name} index={ind} />
          ))}
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
    <Focusable id={id}>
      <Text underline={isFocused}>{name}</Text>
    </Focusable>
  );
};
