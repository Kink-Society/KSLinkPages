"use client"

import { useEffect, useRef } from "react"
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
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = ""

      // Create the container div
      const helioContainer = document.createElement("div")
      helioContainer.id = "helioCheckoutContainer"

      // Create the script element
      const script = document.createElement("script")
      script.type = "module"
      script.crossOrigin = "anonymous"
      script.src = "https://embed.hel.io/assets/index-v1.js"

      // Create the initialization script
      const initScript = document.createElement("script")
      initScript.textContent = `
        document.addEventListener("DOMContentLoaded", () => {
          window.helioCheckout(
            document.getElementById("helioCheckoutContainer"),
            {
              paylinkId: "${paylinkId}",
              theme: {"themeMode":"dark"},
              primaryColor: "${primaryColor}",
              neutralColor: "${neutralColor}"
            }
          );
        });
      `

      // Append elements to the container
      containerRef.current.appendChild(helioContainer)
      containerRef.current.appendChild(script)
      containerRef.current.appendChild(initScript)
    }
  }, [isOpen, paylinkId, primaryColor, neutralColor])

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
            <div ref={containerRef} className="min-h-[300px]" />
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
