import { searchAnime } from '@/lib/api'
import { AnimeCard } from '@/components/anime-card'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q
  const data = await searchAnime(query)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">
        Search Results for "{query}"
      </h1>
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
    </div>
  )
}