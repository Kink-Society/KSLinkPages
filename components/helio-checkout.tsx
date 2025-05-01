"use client"

import { motion, AnimatePresence } from "framer-motion"

interface HelioDropdownProps {
  paylinkId: string
  primaryColor: string
  neutralColor?: string
  isOpen: boolean
  onClose: () => void
}

export function HelioDropdown({
  paylinkId,
  primaryColor,
  neutralColor = "#FFFFFF",
  isOpen,
  onClose,
}: HelioDropdownProps) {
  // Create a direct URL to the Helio checkout
  const helioUrl = `https://app.hel.io/pay/${paylinkId}?embed=true`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-black/90 rounded-lg mt-2 border border-zinc-800"
        >
          <div className="p-4">
            <iframe src={helioUrl} className="w-full min-h-[400px] border-0" title="Helio Checkout" allow="payment" />
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 px-4 bg-black/50 hover:bg-black/70 border border-zinc-700 rounded-md text-sm text-zinc-300"
              style={{ borderColor: `${primaryColor}50` }}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
