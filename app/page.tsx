"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { GradientBackground } from "@/components/gradient-background"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { MessageCircle, Users, ExternalLink, ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CharacterCard } from "@/components/character-card"

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
      name: "Crystal,",
      avatar:
        "https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Crystal.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvQ3J5c3RhbC5qcGVnIiwiaWF0IjoxNzQ3MDA1NjM4LCJleHAiOjE3Nzg1NDE2Mzh9.EMx_SMB5w4mgD792CjD_Su4X0Ze4ilTYbsIdTsCO0Dk",
      href: "https://links.kinksociety.xyz/crystal",
      accentColor: "#e3a15d",
      age: 28,
      bio: "Brown skin baddie 🍫 | Curls poppin', melanin glowin' ✨| Thick thighs & pretty eyes 👑 | His favorite toxic obsession 😈💦",
      staticImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Crystal11-cpgyCFtrYvj1SuUnidGiuV7LPRZEcV.png",
      hoverVideo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BWBQF9H3SZCK4W53EW5KTA3Q40-jEzpVhQELNQhetSWj9NlwoQRD7KaWi.mp4",
    },
    {
      name: "Asha,",
      avatar:
        "https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Asha.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvQXNoYS5qcGciLCJpYXQiOjE3NDY5MTE2NzMsImV4cCI6MTkwNDU5MTY3M30.tM5MTx9rLzq9OyB3lmB6UWSP71OCqa7JUoD8waALYHM",
      href: "https://links.kinksociety.xyz/asha",
      accentColor: "#d191ff",
      age: 26,
      bio: "Mixed crypto queen 💸 | Pretty face, expensive taste ✨ | Slim waist, fat wallet 👑 | Your favorite financial addiction 😈📈",
      staticImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-30%20at%208.05.14%E2%80%AFPM%202-cFqDV6qayCyYB7aoVfxM7AJaN6KwdL.png",
      hoverVideo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asha8-ET3ZFOTMibbfEScDa9ZCTAZ5k3zvj8.mp4",
    },
    {
      name: "Katie,",
      avatar:
        "https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Katie.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvS2F0aWUuanBnIiwiaWF0IjoxNzQ2OTExNzc0LCJleHAiOjE5MDQ1OTE3NzR9.t-KF0aI3AdLZKc7YpooUL5fR0TiEoMgdIuNeL-7OPnk",
      href: "https://links.kinksociety.xyz/katie",
      accentColor: "#ff91c1",
      age: 25,
      bio: "PAWG Princess 🍑 | Snowbunny Brat ❄️✨ | Mommy plays, Daddy stays 😈 | Your favorite guilty pleasure 💦🔐",
      staticImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/857724468431208396-8woA3knKSTHWDDJYTFGzdu9dg3YnWa.png",
      hoverVideo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Standard_Mode_Woman_blows_a_kiss_to_the_camera-HSjUN5ngQKtw8v4enogLAfcVwlKoxF.mp4",
    },
    {
      name: "Eden,",
      avatar:
        "https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Eden.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvRWRlbi5qcGVnIiwiaWF0IjoxNzQ2OTExNzQ1LCJleHAiOjE5MDQ1OTE3NDV9.JGuGFuFsa2XTCNo-LNidSDOv8j_SKkKpbZ5lJ7A0eOQ",
      href: "https://links.kinksociety.xyz/eden",
      accentColor: "#91ffb7",
      age: 25,
      bio: "Certified troublemaker👅 | Pretty face, dangerous taste✨ | Taking hearts, breaking homes💔 | Your favorite guilty pleasure 😈🔥",
      staticImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/858045519384071372-lJicTbuiP2ncIketXu3u3RwEL5GRHI.png",
      hoverVideo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Standard_Mode_Woman_waves_at_the_camera_with_a-e0Ib4LbIgUbzEDf1O7bDArzM5T28ma.mp4",
    },
  ]

  return (
    <div className="min-h-screen text-white relative">
      <GradientBackground imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%201.43.48%E2%80%AFAM-5l2ZtCrdwkDLTXQEeoU12pyEjoZVcl.png" />
      <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
        <SiteHeader />

        {/* Character Cards */}
        <div className="mt-12 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Featured Influencers</h2>
          <div className="grid grid-cols-2 gap-4">
            {characters.map((character, index) => (
              <div key={index} className="col-span-1">
                <CharacterCard
                  name={character.name}
                  age={character.age}
                  bio={character.bio}
                  staticImage={character.staticImage}
                  hoverVideo={character.hoverVideo}
                  accentColor={character.accentColor}
                  isNew={false}
                  link={character.href}
                />
              </div>
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
