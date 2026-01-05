'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { getCategoryLabel } from '@/lib/utils/categories'

interface Item {
  id: number
  title: string
  category: string
  location: string
  dateFound: string
}

interface ClaimPageProps {
  params: {
    id: string
  }
}

export default function ClaimPage({ params }: ClaimPageProps) {
  const router = useRouter()
  const [item, setItem] = useState<Item | null>(null)
  const [isLoadingItem, setIsLoadingItem] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    proofDescription: '',
  })

  // Fetch item data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${params.id}`)
        if (!response.ok) {
          setItem(null)
          return
        }
        const data = await response.json()
        setItem(data.data)
      } catch (err) {
        console.error('Error fetching item:', err)
        setItem(null)
      } finally {
        setIsLoadingItem(false)
      }
    }

    fetchItem()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/items/${params.id}/claims`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          claimantName: formData.name,
          claimantEmail: formData.email,
          message: formData.message || undefined,
          proofDescription: formData.proofDescription,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.details
            ? errorData.details.map((d: any) => d.message).join(', ')
            : errorData.error || 'Failed to submit claim'
        )
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (isLoadingItem) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center shadow-sm">
          <p className="text-neutral-600">Loading item...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-2">
            Item Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The item you're trying to claim could not be found or is not available for claiming.
          </p>
          <Link
            href="/items"
            className="inline-block rounded-md bg-tucker-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2"
          >
            Browse Items
          </Link>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border-2 border-green-500 bg-green-50 p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-2">
            Claim Submitted Successfully
          </h2>
          <p className="text-neutral-700 mb-6 max-w-md mx-auto">
            Your claim for <strong>{item.title}</strong> has been submitted. You
            will receive a confirmation email at {formData.email} within 24
            hours. School staff will review your claim and contact you if
            additional information is needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/items"
              className="inline-block rounded-md bg-tucker-blue px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2"
            >
              Browse More Items
            </Link>
            <Link
              href={`/items/${params.id}`}
              className="inline-block rounded-md border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2"
            >
              View Item Details
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href={`/items/${params.id}`}
          className="mb-4 inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-tucker-blue focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2 rounded"
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
          Back to item details
        </Link>
        <h1 className="font-display text-4xl font-bold text-tucker-blue sm:text-5xl">
          Claim Item
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Submit a claim for this item with your contact information and proof
          of ownership.
        </p>
      </div>

      {/* Item Summary */}
      <div className="mb-8 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="font-display text-lg font-semibold text-tucker-blue mb-4">
          Item You're Claiming
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-neutral-500">Item</dt>
            <dd className="mt-1 text-sm font-semibold text-neutral-900">
              {item.title}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-neutral-500">Category</dt>
            <dd className="mt-1 text-sm text-neutral-900">
              {getCategoryLabel(item.category)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-neutral-500">Found Location</dt>
            <dd className="mt-1 text-sm text-neutral-900">{item.location}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-neutral-500">Date Found</dt>
            <dd className="mt-1 text-sm text-neutral-900">
              {new Date(item.dateFound).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </dd>
          </div>
        </dl>
      </div>

      {/* Claim Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-tucker-blue mb-6">
            Your Information
          </h2>

          <div className="space-y-6">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              helperText="Your full name as it appears in school records"
              required
            />

            <Input
              label="School Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john.doe@tuckerhs.edu"
              helperText="Your official school email address"
              required
            />

            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any additional information you'd like to provide..."
              helperText="Optional: Add any context or details about how you lost this item"
              rows={4}
            />
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-tucker-blue mb-6">
            Proof of Ownership
          </h2>

          <div className="mb-6 space-y-6">
            <Textarea
              label="Proof of Ownership Description"
              name="proofDescription"
              value={formData.proofDescription}
              onChange={handleInputChange}
              placeholder="Describe how you can prove this item belongs to you. Include specific details like serial numbers, unique markings, contents, or other identifying features..."
              helperText="Provide detailed information that only the owner would know"
              rows={6}
              required
            />
          </div>

          {/* Tips Section */}
          <div className="rounded-lg border border-tucker-blue bg-blue-50 p-6">
            <h3 className="font-semibold text-tucker-blue mb-3 flex items-center">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              What Counts as Proof?
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start">
                <span className="mr-2 text-tucker-blue">•</span>
                <span>
                  <strong>Serial numbers or model numbers</strong> that match
                  your purchase records
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-tucker-blue">•</span>
                <span>
                  <strong>Unique markings or engravings</strong> that you can
                  describe in detail
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-tucker-blue">•</span>
                <span>
                  <strong>Contents or items inside</strong> that only you would
                  know about
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-tucker-blue">•</span>
                <span>
                  <strong>Specific wear patterns, scratches, or damage</strong>{' '}
                  that you can identify
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-tucker-blue">•</span>
                <span>
                  <strong>Purchase receipts or photos</strong> of you with the
                  item (if available)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <Link
            href={`/items/${params.id}`}
            className="rounded-md border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2 text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-tucker-blue px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Claim'}
          </button>
        </div>
      </form>
    </div>
  )
}

