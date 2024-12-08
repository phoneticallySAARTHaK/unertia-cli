import { useStdout } from "ink";
import { useLayoutEffect, useState } from "react";

export function useStdOutDimensions() {
  const { stdout } = useStdout();
  const [dimensions, setDimensions] = useState([stdout.columns, stdout.rows]);

  useLayoutEffect(() => {
    function handler() {
      setDimensions([stdout.columns, stdout.rows]);
    }
    stdout.on("resize", handler);

    return () => {
      stdout.off("resize", handler);
    };
  }, [stdout]);

  return dimensions;
}
