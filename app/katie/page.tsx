"use client"

import { useState } from "react"
import { CharacterLinksPage } from "@/components/character-links-page"
import { MessageCircle, Gift, Heart, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { HelioDropdown } from "@/components/helio-checkout"
import { CharacterCard } from "@/components/character-card"

export default function KatieLinksPage() {
  const [tipDropdownOpen, setTipDropdownOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const accentColor = "#ff91c1"

  const exclusiveContentLink = "https://www.kinksociety.xyz/profiles"

  const links = [
    {
      title: "Exclusive Content",
      description: "Access Katie's premium content",
      icon: <Lock className="h-5 w-5" />,
      href: exclusiveContentLink,
      highlight: true,
    },
    {
      title: "Chat with Katie",
      description: "Start a private conversation",
      icon: <MessageCircle className="h-5 w-5" />,
      href: "https://www.kinksociety.xyz/chat/katie",
    },
    {
      title: "Katie's Wishlist",
      description: "Help make her wishes come true",
      icon: <Heart className="h-5 w-5" />,
      href: "https://www.amazon.com/",
      external: true,
    },
  ]

  // Custom tip link with dropdown
  const tipLink = {
    title: "Tip Katie",
    description: "Show your appreciation",
    icon: <Gift className="h-5 w-5" />,
  }

  // Character card for footer
  const characterCardFooter = (
    <CharacterCard
      name="Katie"
      age={25}
      bio="PAWG Princess 🍑 | Snowbunny Brat ❄️✨ | Mommy plays, Daddy stays 😈 | Your favorite guilty pleasure 💦🔐"
      staticImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/857724468431208396-8woA3knKSTHWDDJYTFGzdu9dg3YnWa.png"
      hoverVideo="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Standard_Mode_Woman_blows_a_kiss_to_the_camera-HSjUN5ngQKtw8v4enogLAfcVwlKoxF.mp4"
      accentColor={accentColor}
      isNew={false}
      link={exclusiveContentLink}
    />
  )

  return (
    <div>
      <CharacterLinksPage
        name="Katie"
        avatar="https://mxbxsaruvnheilougvap.supabase.co/storage/v1/object/sign/admin-content/Profile%20Pictures/Katie.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi1jb250ZW50L1Byb2ZpbGUgUGljdHVyZXMvS2F0aWUuanBnIiwiaWF0IjoxNzQ2OTExNzc0LCJleHAiOjE5MDQ1OTE3NzR9.t-KF0aI3AdLZKc7YpooUL5fR0TiEoMgdIuNeL-7OPnk"
        bio="PAWG Princess 🍑 | Snowbunny Brat ❄️✨ | Mommy plays, Daddy stays 😈 | Your favorite guilty pleasure 💦🔐"
        accentColor={accentColor}
        links={links}
        twitterHandle="KatieKSociety"
        instagramHandle="thekinksociety"
        telegramUrl="https://t.me/+YL2AKzJAmmM0MGIx"
        email="katie@kinksociety.xyz"
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
            paylinkId="678ef7a82212ea81cfe073d6"
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
