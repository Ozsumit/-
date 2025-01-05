import { getRecentEpisodes } from '@/lib/api'
import { AnimeCard } from '@/components/anime-card'

export async function RecentEpisodes() {
  const data = await getRecentEpisodes()

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Episodes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.results.map((anime: any) => (
          <AnimeCard
            key={anime.episodeId}
            id={anime.id}
            title={anime.title}
            image={anime.image}
            episodeId={anime.episodeId}
          />
        ))}
      </div>
    </section>
  )
}