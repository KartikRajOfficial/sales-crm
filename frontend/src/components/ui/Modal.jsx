import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const sizeClasses = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl' };

/**
 * Modal — centered dialog with a blurred backdrop.
 * Scrolls internally for tall forms (header/footer stay fixed via the
 * flex + max-h layout). Contract unchanged: isOpen | onClose | title | size.
 */
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`relative bg-[#12121c] border border-white/10 rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col overflow-hidden`}
          >
            {/* Gradient hairline along the top edge */}
            <div className="h-px w-full accent-hairline shrink-0" />
            {title && (
              <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 shrink-0">
                <h3 className="text-lg font-semibold text-white font-display">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-white/[0.06] rounded-lg p-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="px-6 py-5 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
