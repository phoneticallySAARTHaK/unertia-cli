import { useFocus } from "ink";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

type FocusableProps = {
  children: ReactNode;
  autoFocus?: boolean;
  id: string;
  isActive?: boolean;
};

export const Focusable: FC<FocusableProps> = ({
  children,
  id,
  autoFocus,
  isActive,
}) => {
  const { isFocused } = useFocus({ id, autoFocus, isActive });
  const dispatch = useFocusDispatch();

  useEffect(() => {
    dispatch({ id, type: "register" });
    return () => {
      dispatch({ id, type: "unregister" });
    };
  }, [id]);

  useEffect(() => {
    if (isFocused) {
      dispatch({ id, type: "change" });
    }

    return () => {
      if (isFocused) {
        dispatch({ id: "", type: "change" });
      }
    };
  }, [isFocused]);

  return <>{children}</>;
};

export type FocusContext = {
  list: string[];
  active: string;
};
const focusContext = createContext<FocusContext>({ active: "", list: [] });

export type FocusActions =
  | { type: "register"; id: string }
  | { type: "unregister"; id: string }
  | { type: "change"; id: string };
export type FocusDispatch = Dispatch<FocusActions>;
const focusDispatchContext = createContext<FocusDispatch>(() => {});

export function useFocusContext() {
  return useContext(focusContext);
}

export function useFocusDispatch() {
  return useContext(focusDispatchContext);
}

export const FocusableProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    (prev: FocusContext, action: FocusActions) => {
      switch (action.type) {
        case "register":
          return { ...prev, list: [...prev.list, action.id] };
        case "unregister":
          return { ...prev, list: prev.list.filter((id) => id !== action.id) };
        case "change":
          return { ...prev, active: action.id };
      }
    },
    { list: [], active: "" },
  );

  return (
    <focusContext.Provider value={state}>
      <focusDispatchContext.Provider value={dispatch}>
        {children}
      </focusDispatchContext.Provider>
    </focusContext.Provider>
  );
};

export function useIsFocused(id: string) {
  return useContext(focusContext).active === id;
}
