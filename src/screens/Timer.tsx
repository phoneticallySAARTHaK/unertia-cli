import { Key, useInput } from "ink";
import { FC } from "react";
import { useAppDispatch } from "../components/AppProvider.js";
import { useFocusContext } from "../components/Focusable.js";
import { BACK_BTN_ID, Header } from "../components/Header.js";

export const Timer: FC = () => {
  const { active } = useFocusContext();
  const appDispatch = useAppDispatch();

  function handleInput(_input: string, key: Key) {
    if (key.return && active === BACK_BTN_ID) {
      appDispatch({ screen: "Home", type: "navigate" });
    }
  }

  useInput(handleInput);

  return <Header />;
};
