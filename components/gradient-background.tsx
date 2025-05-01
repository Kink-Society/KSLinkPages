'use client'

import { useEffect, useRef } from 'react'

export function GradientBackground({ imageUrl }: { imageUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1, 1)
      const imageData = ctx.getImageData(0, 0, 1, 1)
      const [r, g, b] = imageData.data

      document.body.style.background = `
        radial-gradient(
          circle at top center,
          rgba(222, 157, 88, 0.3) 0%,
          rgba(0, 0, 0, 0.95) 50%,
          rgba(0, 0, 0, 1) 100%
        )
      `
    }
  }, [imageUrl])

  return <canvas ref={canvasRef} className="hidden" width="1" height="1" />
}
