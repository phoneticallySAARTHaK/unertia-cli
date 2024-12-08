import { Box, Key, Newline, Text, useInput } from "ink";
import { useState } from "react";
import { ColorScheme } from "../utils/constants.js";
import { modAddition } from "../utils/helpers.js";
import { Focusable, useIsFocused } from "./Focusable.js";

export type BaseOptionType = Record<
  "label" | "value",
  string | number | boolean
>;

export function RadioInput<T extends BaseOptionType>({
  id,
  options,
  description,
  label,
}: {
  id: string;
  options: T[];
  label: string;
  description: string;
}) {
  const isFocused = useIsFocused(id);

  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleInput(_input: string, key: Key) {
    if (key.leftArrow) {
      setSelectedIndex((prev) => modAddition(prev, -1, options.length));
    } else if (key.rightArrow) {
      setSelectedIndex((prev) => modAddition(prev, 1, options.length));
    }
  }

  useInput(handleInput, {
    isActive: isFocused,
  });

  return (
    <Box flexDirection="column">
      <Text bold>
        {label} <Newline />
        <Text color="gray" bold={false}>
          {description}
        </Text>
      </Text>

      <Focusable id={id}>
        <Box
          flexDirection="row"
          columnGap={2}
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {options.map((opt, index) => (
            <RadioButton
              isSelected={index === selectedIndex}
              key={index}
              label={opt.label}
              value={opt.value}
              isGroupFocused={isFocused}
            />
          ))}
        </Box>
      </Focusable>
    </Box>
  );
}

type RadioButtonProps<T extends BaseOptionType> = T & {
  isSelected: boolean;
  isGroupFocused: boolean;
};

function RadioButton<T extends BaseOptionType>({
  label,
  isSelected,
  isGroupFocused,
}: RadioButtonProps<T>) {
  return (
    <Box
      paddingX={1}
      borderStyle={isSelected ? "bold" : "single"}
      borderColor={
        isGroupFocused && isSelected ? ColorScheme.primaryDark : undefined
      }
    >
      <Text>
        {isSelected ? "●" : "○"} {label}
      </Text>
    </Box>
  );
}
