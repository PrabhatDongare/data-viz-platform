import React, { useEffect, useRef, useState } from 'react';

interface OverlayPanelProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const OverlayPanel: React.FC<OverlayPanelProps> = ({ open, onClose, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(open);

  // Handle mount/unmount delay for smooth exit animation
  useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 transition-all duration-300">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${open ? 'opacity-95' : 'opacity-0'}`}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      />

      {/* Slide-in Panel */}
      <div
        ref={panelRef}
        className={`absolute top-0 right-0 h-full w-full border-l border-[#5A5A5A] bg-[#161618] shadow-lg transition-transform duration-300 sm:max-w-[80%] md:max-w-[65%] lg:max-w-[50%] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionProperty: 'transform, box-shadow', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
};

export default OverlayPanel;
