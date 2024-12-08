import { Box, Key, Text, useInput } from "ink";
import { forwardRef, MutableRefObject, useEffect, useState } from "react";
import { FormControls } from "../screens/Timer.js";
import { ColorScheme } from "../utils/constants.js";
import { isNumberString } from "../utils/helpers.js";
import { Focusable, useIsFocused } from "./Focusable.js";

type InputProps = {
  id: string;
  setValidationStatus: (val: boolean) => void;
};

export const TimeInput = forwardRef<FormControls, InputProps>(
  ({ id, setValidationStatus }: InputProps, ref) => {
    const isFocused = useIsFocused(id);
    const [timeString, setTimeString] = useState("");
    const [touched, setTouched] = useState(false);

    const hourVal = parseInt(timeString.slice(0, 2));
    const minuteVal = parseInt(timeString.slice(-2));
    const isError =
      isNaN(minuteVal) || minuteVal > 60 || (minuteVal < 1 && hourVal === 0);

    useEffect(() => {
      setValidationStatus(!isError);
    }, [isError]);

    function handleInput(input: string, key: Key) {
      if (key.escape) {
        setTimeString("");
      }

      // key.backspace doesn't work for some reason
      else if (key.delete) {
        setTimeString((prev) => prev.slice(0, -1));
      } else if (isNumberString(input)) {
        setTouched(true);
        setTimeString((prev) => {
          const next = `${prev}${input}`.padStart(4, "0").slice(-4);

          (ref as MutableRefObject<FormControls>).current.duration = [
            parseInt(next.slice(0, 2)),
            parseInt(next.slice(2)),
          ];

          return next;
        });
      }
    }

    useInput(handleInput, { isActive: isFocused });
    const displayStr = timeString.padStart(4, "0");

    return (
      <Box width="100%" flexDirection="column" justifyContent="flex-start">
        <Text bold>
          Enter time duration for the Timer
          <Text color="gray" bold={false}>
            (HH:MM)
          </Text>
          :
        </Text>

        <Box gap={2} alignItems="center">
          <Focusable id={id} autoFocus>
            <Box
              paddingX={1}
              alignSelf="flex-start"
              borderStyle="single"
              borderColor={
                isFocused
                  ? ColorScheme.primaryDark
                  : isError && touched
                    ? "red"
                    : undefined
              }
            >
              <Text>{`${displayStr[0]}${displayStr[1]}:${displayStr[2]}${displayStr[3]}`}</Text>
            </Box>
          </Focusable>
          {isError && touched && <Text color="red">Invalid time value</Text>}
        </Box>
      </Box>
    );
  },
);
