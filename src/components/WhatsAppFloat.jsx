// WhatsAppFloat.jsx
import React from "react";

const WhatsAppFloat = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://wa.me/971501234567" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 animate-pulse"
      >
        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.37 0 0 5.373 0 12c0 2.11.55 4.1 1.6 5.882L0 24l6.31-1.65C8.14 23.45 10.05 24 12 24c6.63 0 12-5.373 12-12S18.63 0 12 0zm0 21.75c-1.71 0-3.38-.45-4.87-1.31l-.35-.2-3.75.98 1-3.64-.23-.37C3.45 16.29 3 14.18 3 12 3 6.48 7.48 2 12 2s9 4.48 9 10-4.48 9.75-9 9.75zm4.31-6.55c-.23-.11-1.38-.68-1.6-.76-.21-.08-.37-.11-.52.11-.15.23-.6.76-.74.91-.14.15-.27.17-.5.06-.23-.11-.98-.36-1.86-1.16-.69-.61-1.15-1.35-1.29-1.58-.13-.23-.01-.36.1-.48.11-.12.23-.27.34-.41.12-.14.15-.25.23-.41.08-.15.04-.29 0-.41-.04-.11-.45-1.13-.62-1.55-.16-.38-.33-.32-.46-.32h-.4c-.14 0-.36.05-.54.25-.19.2-.71.7-.71 1.71s.73 1.99.83 2.12c.11.13 1.46 2.23 3.54 3.11 2.08.89 2.08.59 2.45.55.38-.03 1.2-.49 1.37-.99.17-.5.17-.92.12-1.01-.05-.09-.2-.15-.42-.27z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
          Chat with us
        </span>
      </a>
    </div>
  );
};

export default WhatsAppFloat;
