import { TopAiringAnime } from '@/components/top-airing-anime'
import { RecentEpisodes } from '@/components/recent-episodes'
import { HeroSection } from '@/components/hero-section'

export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <TopAiringAnime />
      <RecentEpisodes />
    </div>
  )
}