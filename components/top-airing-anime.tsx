import { getTopAiring } from '@/lib/api'
import { AnimeCard } from '@/components/anime-card'

export async function TopAiringAnime() {
  const data = await getTopAiring()

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-6">Top Airing Anime</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.results.map((anime: any) => (
          <AnimeCard
            key={anime.id}
            id={anime.id}
            title={anime.title}
            image={anime.image}
          />
        ))}
      </div>
    </section>
  )
}