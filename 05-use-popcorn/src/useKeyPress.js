import { useEffect } from "react";

export function useKeyPress(key, action) {
  useEffect(() => {
    const keyDownCallback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    };

    document.addEventListener("keydown", keyDownCallback);

    return () => {
      document.removeEventListener("keydown", keyDownCallback);
    };
  }, [action, key]);
}
