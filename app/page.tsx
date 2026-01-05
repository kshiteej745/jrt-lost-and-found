import Link from 'next/link'

const recentItems = [
  {
    id: 1,
    item: 'Black backpack',
    location: 'Cafeteria',
    date: '2 hours ago',
    status: 'unclaimed',
  },
  {
    id: 2,
    item: 'Blue water bottle',
    location: 'Gym',
    date: '5 hours ago',
    status: 'unclaimed',
  },
  {
    id: 3,
    item: 'Calculator',
    location: 'Library',
    date: '1 day ago',
    status: 'unclaimed',
  },
  {
    id: 4,
    item: 'Gray hoodie',
    location: 'Hallway B',
    date: '1 day ago',
    status: 'unclaimed',
  },
  {
    id: 5,
    item: 'Wireless earbuds',
    location: 'Auditorium',
    date: '2 days ago',
    status: 'unclaimed',
  },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-6xl font-bold text-tucker-blue sm:text-7xl mb-6 tracking-tight">
            Lost & Found
          </h1>
          <p className="text-2xl text-neutral-700 mb-4 font-medium">
            Reuniting lost items with their owners at J.R. Tucker High School
          </p>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Found something? Lost something? Use this portal to report found items or search for your missing belongings.
          </p>
        </div>
      </section>

      {/* Primary CTAs */}
      <section className="mb-20">
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Link
            href="/report"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-tucker-blue to-tucker-blue-dark p-8 text-white shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="relative z-10">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="font-display text-3xl font-bold mb-2">Report Found Item</h2>
              <p className="text-white/90">
                Log an item you found on campus to help reunite it with its owner
              </p>
            </div>
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-2xl transform translate-x-8 translate-y-8 group-hover:scale-150 transition-transform" />
          </Link>

          <Link
            href="/items"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-tiger-orange to-tiger-orange-dark p-8 text-white shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="relative z-10">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="font-display text-3xl font-bold mb-2">Browse Items</h2>
              <p className="text-white/90">
                Search through items that have been turned in to find your lost belongings
              </p>
            </div>
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-2xl transform translate-x-8 translate-y-8 group-hover:scale-150 transition-transform" />
          </Link>
        </div>
      </section>

      {/* How It Works - Visual Diagram */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-tucker-blue mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            A simple three-step process to help reunite lost items with their owners
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-tucker-blue via-tiger-orange to-tucker-blue transform -translate-y-1/2">
            <div className="absolute left-1/3 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tucker-blue" />
            <div className="absolute right-1/3 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tiger-orange" />
          </div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-tucker-blue hover:shadow-xl transition-all">
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-tucker-blue/20 blur-xl" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-tucker-blue text-3xl font-bold text-white shadow-lg">
                      1
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-xl bg-tucker-blue/10 p-4">
                    <svg className="h-12 w-12 text-tucker-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-tucker-blue mb-3 text-center">
                  Report Found Items
                </h3>
                <p className="text-neutral-600 text-center leading-relaxed">
                  Found something on campus? Log it with location and description to help us match it with its owner.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-tiger-orange hover:shadow-xl transition-all">
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-tiger-orange/20 blur-xl" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-tiger-orange text-3xl font-bold text-white shadow-lg">
                      2
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-xl bg-tiger-orange/10 p-4">
                    <svg className="h-12 w-12 text-tiger-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-tiger-orange mb-3 text-center">
                  Browse Available Items
                </h3>
                <p className="text-neutral-600 text-center leading-relaxed">
                  Search through items that have been turned in. Filter by location, date, or category to find what you're looking for.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-tucker-blue hover:shadow-xl transition-all">
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-tucker-blue/20 blur-xl" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-tucker-blue text-3xl font-bold text-white shadow-lg">
                      3
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-xl bg-tucker-blue/10 p-4">
                    <svg className="h-12 w-12 text-tucker-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-tucker-blue mb-3 text-center">
                  Claim Your Item
                </h3>
                <p className="text-neutral-600 text-center leading-relaxed">
                  Found a match? Submit a claim with identifying details. You'll be notified to pick it up from the main office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Logged Items */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-tucker-blue mb-2">
              Recently Logged Items
            </h2>
            <p className="text-neutral-600">
              Latest items that have been reported and approved
            </p>
          </div>
          <Link
            href="/items"
            className="hidden sm:flex items-center gap-2 rounded-lg bg-tucker-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-tucker-blue-dark hover:shadow-lg"
          >
            View All Items
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="inline-flex min-w-full gap-4">
            {recentItems.map((item) => (
              <Link
                key={item.id}
                href={`/items/${item.id}`}
                className="group min-w-[280px] rounded-xl border-2 border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-tucker-blue hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="font-semibold text-neutral-900 text-lg group-hover:text-tucker-blue transition-colors">
                    {item.item}
                  </h3>
                  <span className="ml-2 rounded-full bg-tucker-blue/10 px-3 py-1 text-xs font-semibold text-tucker-blue">
                    Available
                  </span>
                </div>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-tucker-blue group-hover:gap-2 transition-all">
                  View details
                  <svg className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/items"
            className="inline-flex items-center gap-2 rounded-lg bg-tucker-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-tucker-blue-dark"
          >
            View All Items
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
