import { useEffect, useRef, useState } from "react";

// Tap/click-friendly inline glossary tooltip — works on touch devices too,
// unlike native title="" tooltips which never show on mobile.
export default function Glossary({ term, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  return (
    <span className="glossary" ref={ref}>
      <button
        type="button"
        className="glossary-trigger"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        {children}
      </button>
      {open && (
        <span className="glossary-tip" role="tooltip">
          {term}
        </span>
      )}
    </span>
  );
}
