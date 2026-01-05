'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getCategoryLabel, formatDateFound } from '@/lib/utils/categories'

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'keys', label: 'Keys' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'books', label: 'Books & School Supplies' },
  { value: 'bags', label: 'Bags & Backpacks' },
  { value: 'water-bottles', label: 'Water Bottles' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'sports-equipment', label: 'Sports Equipment' },
  { value: 'other', label: 'Other' },
]

interface Item {
  id: number
  title: string
  category: string
  location: string
  dateFound: string
  photos: string[]
  status: string
}

export default function ItemsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  )
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>(
    (searchParams.get('sort') as 'newest' | 'oldest') || 'newest'
  )
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  const [showSuccessMessage, setShowSuccessMessage] = useState(
    searchParams.get('submitted') !== null
  )

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (searchQuery.trim()) params.set('q', searchQuery.trim())
        if (selectedCategory !== 'all') params.set('category', selectedCategory)
        params.set('sort', sortBy)

        const response = await fetch(`/api/items?${params.toString()}`)

        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }

        const data = await response.json()
        setItems(data.data || [])
        setTotalItems(data.pagination?.total || 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setItems([])
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce search query
    const timeoutId = setTimeout(() => {
      fetchItems()
    }, searchQuery ? 300 : 0)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-tucker-blue sm:text-5xl">
          Browse Items
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Search through items that have been turned in to the Lost & Found.
        </p>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-start justify-between">
            <div className="flex">
              <svg
                className="h-5 w-5 text-green-600 mt-0.5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  Item submitted successfully!
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Your item has been submitted and is pending review by school staff. 
                  It will appear on this page once approved.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-green-600 hover:text-green-800"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="mb-8 space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="sr-only">
              Search items
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by item name, location, or category..."
                className="w-full rounded-md border border-neutral-300 py-2.5 pl-10 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="sr-only">
              Filter by category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:border-transparent transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
          <p className="text-sm text-neutral-600">
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                {totalItems} item{totalItems !== 1 ? 's' : ''} found
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-neutral-600">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:border-transparent transition-colors"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {isLoading ? (
        <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center shadow-sm">
          <p className="text-neutral-600">Loading items...</p>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-12 text-center shadow-sm">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-tucker-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      ) : items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-tucker-blue focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2"
            >
              {/* Photo */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                {item.photos && item.photos.length > 0 ? (
                  <img
                    src={item.photos[0]}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                    <svg
                      className="h-16 w-16 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
                    {item.status === 'approved' ? 'Available' : item.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-tucker-blue transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span>{getCategoryLabel(item.category)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDateFound(item.dateFound)}</span>
                  </div>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-tucker-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center shadow-sm">
          <svg
            className="mx-auto h-16 w-16 text-neutral-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 font-display text-xl font-semibold text-neutral-900">
            No items found
          </h3>
          <p className="mt-2 text-neutral-600 max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
              : 'No items have been reported yet. Check back later or report an item you\'ve found.'}
          </p>
          {searchQuery || selectedCategory !== 'all' ? (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="mt-6 rounded-md bg-tucker-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2"
            >
              Clear filters
            </button>
          ) : (
            <Link
              href="/report"
              className="mt-6 inline-block rounded-md bg-tucker-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2"
            >
              Report Found Item
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

