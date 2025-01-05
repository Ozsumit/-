import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface AnimeCardProps {
  id: string
  title: string
  image: string
  episodeId?: string
}

export function AnimeCard({ id, title, image, episodeId }: AnimeCardProps) {
  const href = episodeId ? `/watch/${episodeId}` : `/anime/${id}`

  return (
    <Link href={href}>
      <Card className="overflow-hidden transition-transform hover:-translate-y-1">
        <div className="aspect-[2/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-2">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}