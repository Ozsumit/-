import { getAnimeInfo } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function AnimePage({ params }: { params: { id: string } }) {
  const data = await getAnimeInfo(params.id)

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="relative aspect-[2/3]">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <div className="flex flex-wrap gap-2">
            {data.genres.map((genre: string) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground">{data.description}</p>
          {data.episodes.length > 0 && (
            <Link href={`/watch/${data.episodes[0].id}`}>
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Start Watching
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Episodes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.episodes.map((episode: any) => (
            <Link
              key={episode.id}
              href={`/watch/${episode.id}`}
              className="block p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              Episode {episode.number}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}