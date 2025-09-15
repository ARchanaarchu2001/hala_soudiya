import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Small accordion with smooth height animation */
export default function AccordionPanel({ title, defaultOpen = false, children }) {
  const [open, setOpen] = React.useState(!!defaultOpen);

  return (
    <div className="bg-white/90 border rounded-2xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ borderBottom: open ? "1px solid rgba(0,0,0,0.06)" : "none" }}
      >
        <span className="font-semibold text-lg text-gray-900">{title}</span>
        <span className={`inline-block transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="px-5 py-5 text-gray-800">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
