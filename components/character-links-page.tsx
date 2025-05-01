"use client"

import type React from "react"

import { useState } from "react"
import { GradientBackground } from "@/components/gradient-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Twitter, Instagram, Globe, Mail, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CharacterLink {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  external?: boolean
  highlight?: boolean
}

interface CharacterLinksPageProps {
  name: string
  avatar: string
  bio: string
  accentColor?: string
  links: CharacterLink[]
  twitterHandle?: string
  instagramHandle?: string
  telegramUrl?: string
  email?: string
  websiteUrl?: string
  children?: React.ReactNode
}

export function CharacterLinksPage({
  name,
  avatar,
  bio,
  accentColor = "#de9d58",
  links,
  twitterHandle,
  instagramHandle,
  telegramUrl,
  email,
  websiteUrl,
  children,
}: CharacterLinksPageProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen text-white relative">
      <GradientBackground imageUrl={avatar} />
      <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
        {/* Character Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 mb-4 relative">
            <Avatar className="w-24 h-24 border-2" style={{ borderColor: accentColor }}>
              <AvatarImage src={avatar || "/placeholder.svg"} alt={`${name}'s avatar`} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">{name}</h1>
          <p className="text-zinc-300 mb-6 drop-shadow">{bio}</p>

          <div className="flex gap-4 mb-6">
            {websiteUrl && (
              <Link href={websiteUrl} target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
                  style={{ borderColor: `${accentColor}50` }}
                >
                  <Globe className="h-4 w-4" style={{ color: accentColor }} />
                  <span className="sr-only">Website</span>
                </Button>
              </Link>
            )}
            {twitterHandle && (
              <Link href={`https://twitter.com/${twitterHandle}`} target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
                  style={{ borderColor: `${accentColor}50` }}
                >
                  <Twitter className="h-4 w-4" style={{ color: accentColor }} />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
            )}
            {instagramHandle && (
              <Link href={`https://instagram.com/${instagramHandle}`} target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
                  style={{ borderColor: `${accentColor}50` }}
                >
                  <Instagram className="h-4 w-4" style={{ color: accentColor }} />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
            )}
            {telegramUrl && (
              <Link href={telegramUrl} target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
                  style={{ borderColor: `${accentColor}50` }}
                >
                  <MessageSquare className="h-4 w-4" style={{ color: accentColor }} />
                  <span className="sr-only">Telegram</span>
                </Button>
              </Link>
            )}
            {email && (
              <Link href={`mailto:${email}`}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
                  style={{ borderColor: `${accentColor}50` }}
                >
                  <Mail className="h-4 w-4" style={{ color: accentColor }} />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Custom Content */}
        {children}

        {/* Links */}
        <div className="space-y-4 pb-8">
          {links.map((link, index) => (
            <motion.div
              key={index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href={link.href} target={link.external ? "_blank" : undefined}>
                <Card
                  className={`bg-black/80 border-zinc-800 hover:bg-[${accentColor}]/10 transition-colors shadow-md overflow-hidden ${
                    link.highlight ? `border-[${accentColor}]` : ""
                  }`}
                >
                  <div className="relative p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                      >
                        {link.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-white">{link.title}</h3>
                        <p className="text-sm text-zinc-400">{link.description}</p>
                      </div>
                      {link.external && <ExternalLink className="h-4 w-4 text-zinc-500" />}
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5"
                      style={{ backgroundColor: accentColor }}
                      initial={{ width: "0%" }}
                      animate={{ width: hoveredIndex === index ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Copyright Footer */}
        <div className="text-center text-xs text-zinc-500 mt-8 pb-4">
          <p>© 2025 | Kink Society Ecosystem</p>
          <div className="mt-1">
            <Link href="/terms" className="underline hover:text-zinc-400 mr-3">
              Terms of Service
            </Link>
            <Link href="/privacy" className="underline hover:text-zinc-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
