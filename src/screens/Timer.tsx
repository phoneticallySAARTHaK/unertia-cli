import { Box, Key, Text, useInput } from "ink";
import { FC, MutableRefObject, useCallback, useRef, useState } from "react";
import { useAppDispatch } from "../components/AppProvider.js";
import { Focusable, useIsFocused } from "../components/Focusable.js";
import { Header } from "../components/Header.js";
import { BaseOptionType, RadioInput } from "../components/RadioInput.js";
import { TimeInput } from "../components/TimeInput.js";
import { ColorScheme } from "../utils/constants.js";

import { exec } from "node:child_process";
import { setTransientTimer } from "../utils/commands.js";

const formControlsId = {
  timeInput: "0",
  accuracyInput: "1",
  ignoreIhibitors: "2",
};

export type FormControls = {
  duration: [number, number]; // [hours, minute]
  accuracy: "1min" | "10s" | "1s";
  force: boolean;
};

type AccuracyOptionType = { value: FormControls["accuracy"]; label: string };

const accuracyOptions: AccuracyOptionType[] = [
  {
    label: "Low",
    value: "1min",
  },
  {
    label: "Moderate",
    value: "10s",
  },
  {
    label: "Precise",
    value: "1s",
  },
];

const ignoreIhibitorsOptions: BaseOptionType[] = [
  { label: "No", value: false },
  { label: "Yes", value: true },
];

export const Timer: FC = () => {
  const appDispatch = useAppDispatch();
  const [formValidationStatus, setFormValidationStatus] = useState<
    Record<keyof FormControls, boolean>
  >({ accuracy: true, duration: false, force: true });

  const formValuesRef = useRef<FormControls>({
    accuracy: "1min",
    duration: [0, 0],
    force: false,
  });

  const handleInput = useCallback(
    (_input: string, key: Key) => {
      if (key.escape) {
        appDispatch({ screen: "Home", type: "navigate" });
      }
    },
    [appDispatch],
  );
  useInput(handleInput);

  return (
    <Box flexDirection="column" flexShrink={0}>
      <Header screenName="Set a Timer" />

      <Box flexGrow={1} flexDirection="column" gap={1} flexShrink={0}>
        <TimeInput
          id={formControlsId.timeInput}
          setValidationStatus={(val) =>
            setFormValidationStatus((prev) => ({ ...prev, duration: val }))
          }
          ref={formValuesRef}
        />

        <RadioInput
          label="Select the accuracy of the Timer"
          description="Higher accuracy will take more system resources, and battery"
          id={formControlsId.accuracyInput}
          options={accuracyOptions}
        />

        <RadioInput
          label="Ignore Inhibitors?"
          description="Force shutdown, ignore blocking processes"
          id={formControlsId.ignoreIhibitors}
          options={ignoreIhibitorsOptions}
        />

        <SubmitButton
          formValuesRef={formValuesRef}
          isDisabled={
            !formValidationStatus.accuracy || !formValidationStatus.duration
          }
        />
      </Box>

      <Text color="grey">Press 'Esc' to go back</Text>
    </Box>
  );
};

type SubmitButtonProps = {
  isDisabled: boolean;
  formValuesRef: MutableRefObject<FormControls>;
};

function SubmitButton({ formValuesRef, isDisabled }: SubmitButtonProps) {
  const id = "submit";
  const isFocused = useIsFocused(id);
  const appDispatch = useAppDispatch();

  useInput(
    (_input, key) => {
      if (!key.return) {
        return;
      }

      console.assert(Array.isArray(formValuesRef.current.duration));

      exec(
        setTransientTimer(
          `${formValuesRef.current.duration[0]}h${formValuesRef.current.duration[1]}m`,
          false,
        ),
        () => {
          exec(
            `notify-send 'shutdown timer set for ${`${formValuesRef.current.duration[0]}h${formValuesRef.current.duration[1]}m`}' -a 'Unertia'`,
          );
          appDispatch({ screen: "Home", type: "navigate" });
        },
      );
    },
    { isActive: isFocused },
  );

  return (
    <Focusable id={id} isActive={!isDisabled}>
      <Box
        borderColor={isFocused ? ColorScheme.primaryDark : "green"}
        borderDimColor={isDisabled}
        borderStyle={isDisabled ? "single" : "bold"}
        paddingX={1}
        flexShrink={0}
        alignSelf="flex-start"
      >
        <Text>Create</Text>
      </Box>
    </Focusable>
  );
}
