import { useState, useEffect } from "react";

export function useLocalStorageState(key) {
  const [value, setvalue] = useState(function () {
    const storageData = localStorage.getItem(key);
    return JSON.parse(storageData) || [];
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setvalue];
}
