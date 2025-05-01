import { Twitter, Instagram, Globe, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <div className="w-24 h-24 mb-4 relative">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%201.43.48%E2%80%AFAM-5l2ZtCrdwkDLTXQEeoU12pyEjoZVcl.png"
          alt="KS Logo"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">Kink Society.</h1>
      <p className="text-zinc-300 mb-4 drop-shadow">21+ NSFW | Adult Content & Tech | Email for Inquiries</p>
      <div className="flex gap-4">
        <Link href="https://www.kinksociety.xyz" target="_blank">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
          >
            <Globe className="h-4 w-4 text-[#de9d58]" />
            <span className="sr-only">Website</span>
          </Button>
        </Link>
        <Link href="https://www.x.com/thekinksociety" target="_blank">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
          >
            <Twitter className="h-4 w-4 text-[#de9d58]" />
            <span className="sr-only">Twitter</span>
          </Button>
        </Link>
        <Link href="https://www.instagram.com/thekinksociety" target="_blank">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
          >
            <Instagram className="h-4 w-4 text-[#de9d58]" />
            <span className="sr-only">Instagram</span>
          </Button>
        </Link>
        <Link href="https://t.me/+YL2AKzJAmmM0MGIx" target="_blank">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
          >
            <MessageSquare className="h-4 w-4 text-[#de9d58]" />
            <span className="sr-only">Telegram</span>
          </Button>
        </Link>
        <Link href="mailto:info@kinksociety.xyz">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-[#de9d58]/20 border-[#de9d58]/50"
          >
            <Mail className="h-4 w-4 text-[#de9d58]" />
            <span className="sr-only">Email</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
