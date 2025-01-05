'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SearchResults } from '@/components/search-results'

export function Header() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setShowResults(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Omega</span>
        </Link>
        <div className="flex-1 relative">
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search anime..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowResults(e.target.value.length >= 3)
              }}
              className="w-full"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          {showResults && query.length >= 3 && (
            <SearchResults query={query} onSelect={() => setShowResults(false)} />
          )}
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}