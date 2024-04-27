import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = (exceptionRefs) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && 
          !exceptionRefs.some(exceptionRef => exceptionRef.current && exceptionRef.current.contains(event.target))) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, exceptionRefs]); 

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;