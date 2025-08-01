import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-32">
        <div className="mb-32 flex flex-col items-center text-center">
          <Badge
            className="mb-8 border-zinc-800 bg-zinc-900/50 text-zinc-400 backdrop-blur"
            variant="secondary"
          >
            v0.1.0 Beta
          </Badge>

          <h1 className="mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-6xl font-bold tracking-tighter text-transparent md:text-7xl lg:text-8xl">
            N5 Starter Kit
          </h1>

          <p className="mb-12 max-w-2xl text-lg text-zinc-400 md:text-xl">
            A modern full-stack starter template built for speed and developer
            experience. Start your next project with the best tools in the React
            ecosystem.
          </p>

          <div className="mb-16 flex gap-4">
            <Link href="https://github.com/nameerakhter">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10"
              >
                View on GitHub
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <TechIcon src="/tech/nextjs.svg" alt="Next.js" />
            <TechIcon src="/tech/typescript.svg" alt="TypeScript" />
            <TechIcon src="/tech/trpc.svg" alt="tRPC" />
            <TechIcon src="/tech/prisma.svg" alt="Prisma" />
            <TechIcon src="/tech/tailwind.svg" alt="Tailwind CSS" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            icon="/globe.svg"
            title="Full Stack"
            description="End-to-end type safety with tRPC and Prisma. Build APIs with confidence."
          />
          <FeatureCard
            icon="/window.svg"
            title="Modern Stack"
            description="Next.js 14 App Router with React Server Components and Server Actions."
          />
          <FeatureCard
            icon="/file.svg"
            title="Authentication"
            description="Secure authentication with NextAuth.js, Prisma, and OAuth providers."
          />
        </div>
      </div>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <Card className="group border-zinc-800/50 bg-zinc-900/20 text-white backdrop-blur transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/30">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-zinc-800/50 p-3 transition-all duration-300 group-hover:bg-zinc-800">
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className="invert transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </CardContent>
    </Card>
  )
}

function TechIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-800/50 bg-zinc-900/20 p-3 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-zinc-700 hover:bg-zinc-900/30">
        <Image
          src={src}
          alt={alt}
          width={32}
          height={32}
          className="invert transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-zinc-800 px-3 py-1 text-xs text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
        {alt}
      </div>
    </div>
  )
}
