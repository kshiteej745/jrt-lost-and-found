import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Serif } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'J.R. Tucker High School Lost & Found',
  description: 'Report and browse lost items at J.R. Tucker High School',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexSerif.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="border-b-4 border-tucker-blue bg-gradient-to-b from-white to-neutral-50 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-24 items-center justify-between">
                <Link href="/" className="flex items-center group">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tucker-blue text-white shadow-md transition-transform group-hover:scale-105">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="font-display text-2xl font-bold text-tucker-blue sm:text-3xl tracking-tight">
                        J.R. Tucker High School
                      </h1>
                      <p className="text-sm font-medium text-tiger-orange sm:text-base">
                        Lost & Found
                      </p>
                    </div>
                  </div>
                </Link>
                <nav className="hidden md:flex md:items-center md:gap-2">
                  <a
                    href="/"
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 transition-all hover:bg-tucker-blue hover:text-white hover:shadow-md"
                  >
                    Home
                  </a>
                  <a
                    href="/report"
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 transition-all hover:bg-tucker-blue hover:text-white hover:shadow-md"
                  >
                    Report Item
                  </a>
                  <a
                    href="/items"
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 transition-all hover:bg-tucker-blue hover:text-white hover:shadow-md"
                  >
                    Browse Items
                  </a>
                </nav>
                <button
                  className="md:hidden rounded-lg p-2 hover:bg-neutral-100 transition-colors"
                  aria-label="Toggle navigation menu"
                  type="button"
                >
                  <svg
                    className="h-6 w-6 text-neutral-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-neutral-200 bg-neutral-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                  <h2 className="font-display text-lg font-semibold text-tucker-blue">
                    J.R. Tucker High School
                  </h2>
                  <p className="mt-2 text-sm text-neutral-600">
                    Lost & Found Operations
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Quick Links
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                    <li>
                      <a
                        href="/"
                        className="transition-colors hover:text-tucker-blue"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/report"
                        className="transition-colors hover:text-tucker-blue"
                      >
                        Report Found Item
                      </a>
                    </li>
                    <li>
                      <a
                        href="/browse"
                        className="transition-colors hover:text-tucker-blue"
                      >
                        Browse Items
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Contact
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    For questions about lost items, please contact the main
                    office or visit during school hours.
                  </p>
                </div>
              </div>
              <div className="mt-8 border-t border-neutral-200 pt-6">
                <p className="text-center text-xs text-neutral-500">
                  © {new Date().getFullYear()} J.R. Tucker High School. All
                  rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

