"use client"

import { useState } from "react"
import { CharacterLinksPage } from "@/components/character-links-page"
import { MessageCircle, Gift, Heart, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { HelioDropdown } from "@/components/helio-checkout"
import { CharacterCard } from "@/components/character-card"

export default function AshaLinksPage() {
  const [tipDropdownOpen, setTipDropdownOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const accentColor = "#d191ff"

  const exclusiveContentLink = "https://www.kinksociety.xyz/profiles"

  const links = [
    {
      title: "Exclusive Content",
      description: "Access Asha's premium content",
      icon: <Lock className="h-5 w-5" />,
      href: exclusiveContentLink,
      highlight: true,
    },
    {
      title: "Chat with Asha",
      description: "Start a private conversation",
      icon: <MessageCircle className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz/chat/asha",
    },
    {
      title: "Asha's Wishlist",
      description: "Help make her wishes come true",
      icon: <Heart className="h-5 w-5" />,
      href: "https://www.amazon.com/",
      external: true,
    },
  ]

  // Custom tip link with dropdown
  const tipLink = {
    title: "Tip Asha",
    description: "Show your appreciation",
    icon: <Gift className="h-5 w-5" />,
  }

  // Character card for footer
  const characterCardFooter = (
    <CharacterCard
      name="Asha"
      age={23}
      bio="Passionate and mysterious model with an artistic soul. Loves photography and dancing."
      staticImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-30%20at%208.05.14%E2%80%AFPM%202-cFqDV6qayCyYB7aoVfxM7AJaN6KwdL.png"
      hoverVideo="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asha8-ET3ZFOTMibbfEScDa9ZCTAZ5k3zvj8.mp4"
      accentColor={accentColor}
      isNew={false}
      link={exclusiveContentLink}
    />
  )

  return (
    <div>
      <CharacterLinksPage
        name="Asha"
        avatar="https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Asha.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvQXNoYS5qcGciLCJpYXQiOjE3NDY5MTE2NzMsImV4cCI6MTkwNDU5MTY3M30.tM5MTx9rLzq9OyB3lmB6UWSP71OCqa7JUoD8waALYHM"
        bio="Mixed crypto queen 💸 | Pretty face, expensive taste ✨ | Slim waist, fat wallet 👑 | Your favorite financial addiction 😈📈"
        accentColor={accentColor}
        links={links}
        twitterHandle="AshaKSociety"
        instagramHandle="thekinksociety"
        telegramUrl="https://t.me/+YL2AKzJAmmM0MGIx"
        email="asha@kinksociety.xyz"
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
            paylinkId="678ef6614ea932bb95b28d18"
            primaryColor={accentColor}
            neutralColor="#E1E6EC"
            isOpen={tipDropdownOpen}
            onClose={() => setTipDropdownOpen(false)}
          />
        </div>
      </CharacterLinksPage>
    </div>
  )
}
