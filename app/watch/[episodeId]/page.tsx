'use client'

import { useEffect, useState } from 'react'
import { getEpisodeServers } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function WatchPage({
  params,
}: {
  params: { episodeId: string }
}) {
  const [servers, setServers] = useState<any[]>([])
  const [currentServer, setCurrentServer] = useState<string>('')

  useEffect(() => {
    getEpisodeServers(params.episodeId)
      .then((data) => {
        setServers(data)
        if (data.length > 0) {
          setCurrentServer(data[0].url)
        }
      })
      .catch(console.error)
  }, [params.episodeId])

  return (
    <div className="space-y-6">
      <Card className="aspect-video relative overflow-hidden">
        <iframe
          src={currentServer}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      </Card>
      <div className="flex flex-wrap gap-2">
        {servers.map((server) => (
          <Button
            key={server.name}
            variant={currentServer === server.url ? 'default' : 'outline'}
            onClick={() => setCurrentServer(server.url)}
          >
            {server.name}
          </Button>
        ))}
      </div>
    </div>
  )
}