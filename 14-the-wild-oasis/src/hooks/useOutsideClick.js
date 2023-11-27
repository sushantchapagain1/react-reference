import { useEffect, useRef } from 'react';

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleOutsideClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      // revent moves while capturing phase not bubbling phase if passed true.
      document.addEventListener('click', handleOutsideClick, listenCapturing);

      return () => document.removeEventListener('click', handleOutsideClick);
    },
    [handler, listenCapturing]
  );
  return { ref };
}

export default useOutsideClick;
