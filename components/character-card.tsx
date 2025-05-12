"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CharacterCardProps {
  name: string
  age: number
  bio: string
  staticImage: string
  hoverVideo: string
  accentColor: string
  isNew?: boolean
  link: string
}

export function CharacterCard({
  name,
  age,
  bio,
  staticImage,
  hoverVideo,
  accentColor,
  isNew = false,
  link,
}: CharacterCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Preload the video when component mounts
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Handle video loading
    const handleCanPlay = () => {
      setVideoLoaded(true)
      setVideoError(false)
    }

    // Handle video errors
    const handleError = (e: Event) => {
      console.error("Error loading video:", e)
      setVideoError(true)
      setVideoLoaded(false)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    // Preload the video
    video.load()

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [hoverVideo])

  // Play/pause video on hover
  useEffect(() => {
    const video = videoRef.current
    if (!video || videoError) return

    if (isHovering && videoLoaded) {
      video.play().catch((error) => {
        console.error("Error playing video:", error)
        setVideoError(true)
      })
    } else if (video) {
      video.pause()
      // Only reset if we successfully loaded the video before
      if (videoLoaded) {
        video.currentTime = 0
      }
    }
  }, [isHovering, videoLoaded, videoError])

  return (
    <Link href={link} target="_blank">
      <motion.div
        className="relative rounded-xl overflow-hidden shadow-lg mb-6 w-full cursor-pointer border"
        style={{ borderColor: `${accentColor}50` }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isNew && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="px-2 py-1 text-xs font-medium" style={{ backgroundColor: accentColor }}>
              New
            </Badge>
          </div>
        )}

        <div className="relative aspect-[3/4] w-full">
          {/* Static Image - Always visible, used as fallback */}
          <img
            src={staticImage || "/placeholder.svg"}
            alt={`${name}'s profile`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isHovering && videoLoaded && !videoError ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Video that plays on hover - Only shown if loaded successfully */}
          {!videoError && (
            <video
              ref={videoRef}
              src={hoverVideo}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: isHovering && videoLoaded && !videoError ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
              onError={() => setVideoError(true)}
            />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-xl font-bold text-white">
            {name} <span className="text-lg">{age}</span>
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2">{bio}</p>
        </div>
      </motion.div>
    </Link>
  )
}
