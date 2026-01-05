'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategoryLabel } from '@/lib/utils/categories'

interface Item {
  id: number
  title: string
  category: string
  location: string
  dateFound: string
  reportedBy: string | null
  status: string
}

interface Claim {
  id: number
  itemId: number
  item: {
    id: number
    title: string
  }
  claimantName: string
  claimantEmail: string
  submittedDate: string
  status: string
  proofDescription: string
}

export default function AdminDashboard() {
  const [pendingItems, setPendingItems] = useState<Item[]>([])
  const [claims, setClaims] = useState<Claim[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [itemsRes, claimsRes] = await Promise.all([
          fetch('/api/admin/items?status=pending'),
          fetch('/api/admin/claims?status=pending'),
        ])

        if (!itemsRes.ok || !claimsRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const itemsData = await itemsRes.json()
        const claimsData = await claimsRes.json()

        setPendingItems(itemsData.data || [])
        setClaims(claimsData.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleItemAction = async (
    itemId: number,
    action: 'approve' | 'reject'
  ) => {
    try {
      const status = action === 'approve' ? 'approved' : 'pending' // Reject keeps as pending for now
      
      const response = await fetch(`/api/admin/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update item')
      }

      // Remove from pending list
      setPendingItems((items) => items.filter((item) => item.id !== itemId))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update item')
    }
  }

  const handleClaimAction = async (
    claimId: number,
    action: 'approve' | 'reject'
  ) => {
    try {
      const status = action === 'approve' ? 'approved' : 'rejected'

      const response = await fetch(`/api/admin/claims/${claimId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update claim')
      }

      // Update claim status
      setClaims((claims) =>
        claims.map((claim) =>
          claim.id === claimId ? { ...claim, status } : claim
        )
      )
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update claim')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-red-800 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-tucker-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-tucker-blue">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Manage pending items and review claims
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Pending Items Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-tucker-blue">
              Pending Items
            </h2>
            <span className="rounded-full bg-tucker-blue px-2.5 py-0.5 text-xs font-medium text-white">
              {pendingItems.length}
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
            {pendingItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 bg-white">
                    {pendingItems.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50">
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="text-sm font-medium text-neutral-900">
                            {item.title}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {getCategoryLabel(item.category)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-600">
                          {item.location}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-600">
                          {formatDate(item.dateFound)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleItemAction(item.id, 'approve')}
                              className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleItemAction(item.id, 'reject')}
                              className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-neutral-500">
                No pending items
              </div>
            )}
          </div>
        </div>

        {/* Claims Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-tucker-blue">
              Claims
            </h2>
            <span className="rounded-full bg-tucker-blue px-2.5 py-0.5 text-xs font-medium text-white">
              {claims.filter((c) => c.status === 'pending').length}
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
            {claims.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Claimant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 bg-white">
                    {claims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-neutral-50">
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-neutral-900">
                            {claim.claimantName}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {claim.claimantEmail}
                          </div>
                          <div className="mt-1 text-xs text-neutral-400">
                            {formatDate(claim.submittedDate)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-neutral-900">
                            {claim.item.title}
                          </div>
                          <Link
                            href={`/items/${claim.itemId}`}
                            className="text-xs text-tucker-blue hover:underline"
                          >
                            View item →
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              claim.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : claim.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {claim.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                          {claim.status === 'pending' ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() =>
                                  handleClaimAction(claim.id, 'approve')
                                }
                                className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleClaimAction(claim.id, 'reject')
                                }
                                className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-neutral-400">
                              {claim.status === 'approved' ? 'Approved' : 'Rejected'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-neutral-500">
                No claims
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Claim Details Modal/Expansion - Simple inline view for now */}
      {claims.some((c) => c.status === 'pending') && (
        <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-tucker-blue mb-4">
            Pending Claim Details
          </h3>
          <div className="space-y-4">
            {claims
              .filter((c) => c.status === 'pending')
              .map((claim) => (
                <div
                  key={claim.id}
                  className="rounded-lg border border-neutral-200 bg-neutral-50 p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-neutral-900">
                        {claim.claimantName} - {claim.item.title}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {claim.claimantEmail}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-neutral-700">
                      Proof of Ownership:
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      {claim.proofDescription}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

