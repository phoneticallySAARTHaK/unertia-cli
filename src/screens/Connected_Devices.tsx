import { Box, Key, Text, useInput } from "ink";
import { useAppDispatch } from "../components/AppProvider.js";
import { useFocusContext } from "../components/Focusable.js";
import { Header } from "../components/Header.js";

const HOME_BTN_ID = `C-${Math.random()}`;

export const Connected_Devices = () => {
  const { active } = useFocusContext();
  const appDispatch = useAppDispatch();
  function handleInput(_input: string, key: Key) {
    if (key.escape) {
      appDispatch({ screen: "Home", type: "navigate" });
    }
  }
  useInput(handleInput);

  return (
    <Box flexDirection="column" width="100%">
      <Header screenName="Connected Devices" />

      <Box flexDirection="column" alignItems="center" flexGrow={1}>
        <Text>WIP</Text>
      </Box>
      <Text color="grey">Press 'Esc' to go back</Text>
    </Box>
  );
};
