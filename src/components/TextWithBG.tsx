import { Text, TextProps } from "ink";
import { FC } from "react";

/**
 * Adds a trailing and ending space to the text, that increases the background color, (also stretching the underline)
 */
export const TextWithBG: FC<TextProps> = ({ children, ...props }) => {
  return <Text {...props}> {children} </Text>;
};
