import { createContext, Dispatch, FC, ReactNode, useContext } from "react";

export type ScreenName =
  | "Home"
  | "Timer"
  | "Connected_Devices"
  | "Pair_A_New_Device";
export type AppDataContext = {
  screen: ScreenName;
  screenList: ScreenName[];
};

const appDataContext = createContext<AppDataContext>({
  screen: "Home",
  screenList: [],
});

export type AppDispatchActions = {
  type: "navigate";
  screen: AppDataContext["screen"];
};
export type AppDispatch = Dispatch<AppDispatchActions>;
const appDispatchContext = createContext<AppDispatch>(() => {});

export function useAppContext() {
  return useContext(appDataContext);
}

export function useAppDispatch() {
  return useContext(appDispatchContext);
}

export const AppProvider: FC<{
  data: AppDataContext;
  dispatch: AppDispatch;
  children: ReactNode;
}> = ({ data, dispatch, children }) => {
  return (
    <appDataContext.Provider value={data}>
      <appDispatchContext.Provider value={dispatch}>
        {children}
      </appDispatchContext.Provider>
    </appDataContext.Provider>
  );
};
