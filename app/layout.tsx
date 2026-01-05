import type { Metadata } from 'next'
import { Playfair_Display, Work_Sans } from 'next/font/google'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
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
    <html lang="en" className={`${playfairDisplay.variable} ${workSans.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="border-b-2 border-tucker-blue bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-20 items-center justify-between">
                <div className="flex items-center">
                  <h1 className="font-display text-2xl font-bold text-tucker-blue sm:text-3xl">
                    J.R. Tucker High School
                  </h1>
                  <span className="ml-3 hidden text-lg text-neutral-600 sm:inline">
                    Lost & Found
                  </span>
                </div>
                <nav className="hidden md:flex md:items-center md:space-x-1">
                  <a
                    href="/"
                    className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-tucker-blue"
                  >
                    Home
                  </a>
                  <a
                    href="/report"
                    className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-tucker-blue"
                  >
                    Report Found Item
                  </a>
                  <a
                    href="/browse"
                    className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-tucker-blue"
                  >
                    Browse Items
                  </a>
                  <a
                    href="/admin"
                    className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-tucker-blue"
                  >
                    Admin
                  </a>
                </nav>
                <button
                  className="md:hidden"
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

