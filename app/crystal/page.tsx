"use client"

import { useState } from "react"
import { CharacterLinksPage } from "@/components/character-links-page"
import { MessageCircle, Gift, Heart, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { HelioDropdown } from "@/components/helio-checkout"

export default function CrystalLinksPage() {
  const [tipDropdownOpen, setTipDropdownOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const accentColor = "#e3a15d"

  const links = [
    {
      title: "Exclusive Content",
      description: "Access Crystal's premium content",
      icon: <Lock className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz/profiles",
      highlight: true,
    },
    {
      title: "Chat with Crystal",
      description: "Start a private conversation",
      icon: <MessageCircle className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz/chat/crystal",
    },
    {
      title: "Crystal's Wishlist",
      description: "Help make her wishes come true",
      icon: <Heart className="h-5 w-5" />,
      href: "https://www.amazon.com/",
      external: true,
    },
  ]

  // Custom tip link with dropdown
  const tipLink = {
    title: "Tip Crystal",
    description: "Show your appreciation",
    icon: <Gift className="h-5 w-5" />,
  }

  return (
    <div>
      <CharacterLinksPage
        name="Crystal"
        avatar="https://cdn.discordapp.com/attachments/1367006734907871302/1367006763764940841/Crystal1.png?ex=681303c2&is=6811b242&hm=ca7aacd12551bbdd8b156c661f550b817f3e2e6c5048c92e1de271208609e331&"
        bio="Your playful and adventurous companion. Let's explore together!"
        accentColor={accentColor}
        links={links}
        twitterHandle="CrystalKSociety"
        instagramHandle="thekinksociety"
        telegramUrl="https://t.me/+YL2AKzJAmmM0MGIx"
        email="crystal@kinksociety.xyz"
        websiteUrl="https://www.kinksociety.xyz"
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
            paylinkId="678ef75d17bbd202496b9d59"
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
