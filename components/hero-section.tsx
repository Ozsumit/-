import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2070"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container px-4">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Your Gateway to Anime Entertainment
              </h1>
              <p className="text-muted-foreground">
                Stream your favorite anime shows and movies in HD quality. New episodes added daily.
              </p>
              <div className="space-x-4">
                <Link href="/trending">
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    Start Watching
                  </Button>
                </Link>
                <Link href="/recent">
                  <Button variant="secondary">Latest Episodes</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}