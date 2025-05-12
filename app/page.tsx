"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { GradientBackground } from "@/components/gradient-background"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { MessageCircle, Users, ExternalLink, ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const mainLinks = [
    {
      title: "Official Website",
      description: "Visit our full website",
      icon: <ExternalLink className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz",
      external: true,
    },
    {
      title: "Chat with Our Influencers",
      description: "Connect with our exclusive community",
      icon: <MessageCircle className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz/chat",
      external: true,
    },
    {
      title: "Subscribe to Kink Society",
      description: "Get exclusive access to premium content",
      icon: <Users className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz/subscription",
      external: true,
    },
    {
      title: "Explore Content",
      description: "Discover our premium content library",
      icon: <ImageIcon className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz/profiles",
      external: true,
    },
  ]

  const characters = [
    {
      name: "Crystal",
      avatar:
        "https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Crystal.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvQ3J5c3RhbC5qcGVnIiwiaWF0IjoxNzQ3MDA1NjM4LCJleHAiOjE3Nzg1NDE2Mzh9.EMx_SMB5w4mgD792CjD_Su4X0Ze4ilTYbsIdTsCO0Dk",
      href: "/crystal",
    },
    {
      name: "Asha",
      avatar:
        "https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Asha.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvQXNoYS5qcGciLCJpYXQiOjE3NDY5MTE2NzMsImV4cCI6MTkwNDU5MTY3M30.tM5MTx9rLzq9OyB3lmB6UWSP71OCqa7JUoD8waALYHM",
      href: "/asha",
    },
    {
      name: "Katie",
      avatar:
        "https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Katie.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvS2F0aWUuanBnIiwiaWF0IjoxNzQ2OTExNzc0LCJleHAiOjE5MDQ1OTE3NzR9.t-KF0aI3AdLZKc7YpooUL5fR0TiEoMgdIuNeL-7OPnk",
      href: "/katie",
    },
    {
      name: "Eden",
      avatar:
        "https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Eden.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvRWRlbi5qcGVnIiwiaWF0IjoxNzQ2OTExNzQ1LCJleHAiOjE5MDQ1OTE3NDV9.JGuGFuFsa2XTCNo-LNidSDOv8j_SKkKpbZ5lJ7A0eOQ",
      href: "/eden",
    },
  ]

  return (
    <div className="min-h-screen text-white relative">
      <GradientBackground imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%201.43.48%E2%80%AFAM-5l2ZtCrdwkDLTXQEeoU12pyEjoZVcl.png" />
      <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
        <SiteHeader />

        {/* Character Links */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Our Influencers</h2>
          <div className="flex justify-between gap-2 overflow-x-auto pb-2">
            {characters.map((character, index) => (
              <Link key={index} href={character.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <Avatar className="w-16 h-16 mb-2 border-2 border-[#de9d58]/50">
                    <AvatarImage src={character.avatar || "/placeholder.svg"} alt={character.name} />
                    <AvatarFallback>{character.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{character.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Links */}
        <div className="space-y-4">
          {mainLinks.map((link, index) => (
            <motion.div
              key={index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href={link.href} target={link.external ? "_blank" : undefined}>
                <Card className="bg-black/80 border-zinc-800 hover:bg-[#de9d58]/10 transition-colors shadow-md overflow-hidden">
                  <div className="relative p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#de9d58]/20 flex items-center justify-center text-[#de9d58]">
                        {link.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-white">{link.title}</h3>
                        <p className="text-sm text-zinc-400">{link.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-zinc-500" />
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-[#de9d58]"
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
        <div className="text-center text-xs text-zinc-500 mt-12 pb-4">
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
