'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/admin/login')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Header */}
      <header className="border-b-2 border-tucker-blue bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center">
                <h1 className="font-display text-xl font-bold text-tucker-blue">
                  Admin Dashboard
                </h1>
              </Link>
              <span className="ml-3 text-sm text-neutral-500">
                J.R. Tucker Lost & Found
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/items"
                className="text-sm text-neutral-600 hover:text-tucker-blue transition-colors"
              >
                View Public Site
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-neutral-600 hover:text-tucker-blue transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}

