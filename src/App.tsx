import { Box } from "ink";
import { FC, memo, ReactNode, useReducer } from "react";
import {
  AppDataContext,
  AppDispatchActions,
  AppProvider,
  ScreenName,
} from "./components/AppProvider.js";
import { FocusableProvider } from "./components/Focusable.js";
import { screens } from "./screens/index.js";
import { useStdOutDimensions } from "./utils/hooks.js";

export const App = () => {
  const [state, dispatch] = useReducer(appReducer, {
    screen: "Home",
    screenList: [...Object.keys(screens)] as ScreenName[],
  });

  const Screen = screens[state.screen];

  return (
    <AppProvider data={state} dispatch={dispatch}>
      <FocusableProvider>
        <AppWrapper>
          <Screen />
        </AppWrapper>
      </FocusableProvider>
    </AppProvider>
  );
};

function appReducer(
  prev: AppDataContext,
  action: AppDispatchActions,
): AppDataContext {
  switch (action.type) {
    case "navigate":
      return { ...prev, screen: action.screen };
  }
}

const AppWrapper: FC<{ children: ReactNode }> = memo(({ children }) => {
  const [x, y] = useStdOutDimensions();

  return (
    <Box
      minHeight={25} // Need to change each time
      padding={1}
      width={x}
      height={y}
      overflowY="visible"
    >
      {children}
    </Box>
  );
});
