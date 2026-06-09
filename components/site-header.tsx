import Link from "next/link"
import type { ReactNode } from "react"

type SiteHeaderProps = {
  children?: ReactNode
}

export function SiteHeader({ children }: SiteHeaderProps) {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Cucinetta
        </Link>
        {children}
      </div>
    </header>
  )
}
