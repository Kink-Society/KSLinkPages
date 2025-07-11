"use client"

import { useState } from "react"
import { CharacterLinksPage } from "@/components/character-links-page"
import { MessageCircle, Gift, Heart, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { HelioDropdown } from "@/components/helio-checkout"
import { CharacterCard } from "@/components/character-card"

export default function EdenLinksPage() {
  const [tipDropdownOpen, setTipDropdownOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const accentColor = "#91ffb7"

  const exclusiveContentLink = "https://www.kinksociety.xyz/profiles"

  const links = [
    {
      title: "Exclusive Content",
      description: "Access Eden's premium content",
      icon: <Lock className="h-5 w-5" />,
      href: exclusiveContentLink,
      highlight: true,
    },
    {
      title: "Chat with Eden",
      description: "Start a private conversation",
      icon: <MessageCircle className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz/chat/eden",
    },
    {
      title: "Eden's Wishlist",
      description: "Help make her wishes come true",
      icon: <Heart className="h-5 w-5" />,
      href: "https://www.amazon.com/",
      external: true,
    },
  ]

  // Custom tip link with dropdown
  const tipLink = {
    title: "Tip Eden",
    description: "Show your appreciation",
    icon: <Gift className="h-5 w-5" />,
  }

  // Character card for footer
  const characterCardFooter = (
    <CharacterCard
      name="Eden"
      age={22}
      bio="Certified troublemaker👅 | Pretty face, dangerous taste✨ | Taking hearts, breaking homes💔 | Your favorite guilty pleasure 😈🔥"
      staticImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/858045519384071372-lJicTbuiP2ncIketXu3u3RwEL5GRHI.png"
      hoverVideo="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Standard_Mode_Woman_waves_at_the_camera_with_a-e0Ib4LbIgUbzEDf1O7bDArzM5T28ma.mp4"
      accentColor={accentColor}
      isNew={false}
      link={exclusiveContentLink}
    />
  )

  return (
    <div>
      <CharacterLinksPage
        name="Eden"
        avatar="https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Eden.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvRWRlbi5qcGVnIiwiaWF0IjoxNzQ2OTExNzQ1LCJleHAiOjE5MDQ1OTE3NDV9.JGuGFuFsa2XTCNo-LNidSDOv8j_SKkKpbZ5lJ7A0eOQ"
        bio="Certified troublemaker👅 | Pretty face, dangerous taste✨ | Taking hearts, breaking homes💔 | Your favorite guilty pleasure 😈🔥"
        accentColor={accentColor}
        links={links}
        twitterHandle="EdenKSociety"
        instagramHandle="thekinksociety"
        telegramUrl="https://t.me/+YL2AKzJAmmM0MGIx"
        email="eden@kinksociety.xyz"
        websiteUrl="https://www.kinksociety.xyz"
        footerContent={characterCardFooter}
      >
        {/* Custom tip link with dropdown */}
        <div className="mb-4">
          <motion.div
            onHoverStart={() => setHoveredIndex(99)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setTipDropdownOpen(!tipDropdownOpen)}
          >
            <Card
              className={`bg-black/80 border-zinc-800 hover:bg-[${accentColor}]/10 transition-colors shadow-md overflow-hidden cursor-pointer`}
            >
              <div className="relative p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    {tipLink.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-white">{tipLink.title}</h3>
                    <p className="text-sm text-zinc-400">{tipLink.description}</p>
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: accentColor }}
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredIndex === 99 ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Card>
          </motion.div>

          <HelioDropdown
            paylinkId="678ef8c7276ab3e964991b52"
            primaryColor={accentColor}
            neutralColor="#212121"
            isOpen={tipDropdownOpen}
            onClose={() => setTipDropdownOpen(false)}
          />
        </div>
      </CharacterLinksPage>
    </div>
  )
}
