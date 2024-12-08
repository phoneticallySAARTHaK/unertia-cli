import { Box, Key, Text, useInput } from "ink";
import { useAppDispatch } from "../components/AppProvider.js";
import { Header } from "../components/Header.js";

export const Pair_A_New_Device = () => {
  const appDispatch = useAppDispatch();
  function handleInput(_input: string, key: Key) {
    if (key.escape) {
      appDispatch({ screen: "Home", type: "navigate" });
    }
  }
  useInput(handleInput);

  return (
    <Box flexDirection="column" gap={1} width="100%">
      <Header screenName="Pair a new Device" />

      <Box flexDirection="column" alignItems="center" flexGrow={1}>
        <Text>WIP</Text>
      </Box>
      <Text color="grey">Press 'Esc' to go back</Text>
    </Box>
  );
};
