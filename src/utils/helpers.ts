import { ScreenName } from "../components/AppProvider.js";

export function getPrintableScreenName(name: ScreenName) {
  return name.replace(/_/g, " ");
}

export function isNumberString(input: string) {
  if (!input) return false;
  return !/[^\d]/.test(input);
}

/**
 *
 * @param max
 */
export function modAddition(a: number, b: number, max: number) {
  return (((a + b) % max) + max) % max;
}
