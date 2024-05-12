import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = (exceptionRefs, delay = 300) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) &&
        !exceptionRefs.some(exceptionRef => exceptionRef.current && exceptionRef.current.contains(event.target))) {
        setTimeout(() => {
          setExpanded(false);
        }, delay);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, exceptionRefs, delay]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;