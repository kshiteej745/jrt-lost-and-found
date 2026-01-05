import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PhotoGallery } from '@/components/PhotoGallery'
import { StatusBadge } from '@/components/StatusBadge'
import { getCategoryLabel } from '@/lib/utils/categories'

interface ItemDetailPageProps {
  params: {
    id: string
  }
}

async function getItem(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/items/${id}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching item:', error)
    return null
  }
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const item = await getItem(params.id)

  if (!item) {
    notFound()
  }

  const canClaim = item.status === 'approved'
  
  const dateFoundDisplay = new Date(item.dateFound).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/items"
        className="mb-6 inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-tucker-blue focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2 rounded"
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to all items
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Photo Gallery */}
        <div>
          <PhotoGallery photos={item.photos} itemTitle={item.title} />
        </div>

        {/* Right Column - Item Details */}
        <div className="space-y-6">
          {/* Title and Status */}
          <div>
            <div className="mb-4 flex items-start justify-between gap-4">
              <h1 className="font-display text-3xl font-bold text-tucker-blue sm:text-4xl">
                {item.title}
              </h1>
              <StatusBadge status={item.status} />
            </div>
          </div>

          {/* Metadata */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-tucker-blue mb-4">
              Item Information
            </h2>
            <dl className="space-y-4">
              <div className="flex items-start">
                <dt className="flex items-center text-sm font-medium text-neutral-500 w-24">
                  <svg
                    className="mr-2 h-4 w-4 text-neutral-400"
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
                  Category
                </dt>
                <dd className="text-sm text-neutral-900">{getCategoryLabel(item.category)}</dd>
              </div>
              <div className="flex items-start">
                <dt className="flex items-center text-sm font-medium text-neutral-500 w-24">
                  <svg
                    className="mr-2 h-4 w-4 text-neutral-400"
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
                  Location
                </dt>
                <dd className="text-sm text-neutral-900">{item.location}</dd>
              </div>
              <div className="flex items-start">
                <dt className="flex items-center text-sm font-medium text-neutral-500 w-24">
                  <svg
                    className="mr-2 h-4 w-4 text-neutral-400"
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
                  Date Found
                </dt>
                <dd className="text-sm text-neutral-900">{dateFoundDisplay}</dd>
              </div>
            </dl>
          </div>

          {/* Description */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-tucker-blue mb-4">
              Description
            </h2>
            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          {/* Claim Section */}
          {canClaim && (
            <div className="rounded-lg border-2 border-tucker-blue bg-neutral-50 p-6">
              <h2 className="font-display text-lg font-semibold text-tucker-blue mb-2">
                Think this is yours?
              </h2>
              <p className="mb-6 text-sm text-neutral-600">
                If you believe this item belongs to you, submit a claim with
                identifying details. You'll be contacted to verify ownership and
                arrange pickup from the main office.
              </p>
              <Link
                href={`/claim/${item.id}`}
                className="inline-block rounded-md bg-tucker-blue px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2"
              >
                Claim This Item
              </Link>
            </div>
          )}

          {!canClaim && (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm text-neutral-600">
                {item.status === 'claimed' &&
                  'This item has been claimed and is awaiting pickup.'}
                {item.status === 'returned' &&
                  'This item has been returned to its owner.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

