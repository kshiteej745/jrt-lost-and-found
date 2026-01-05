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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Introduction Section */}
      <section className="mb-16">
        <h1 className="font-display text-5xl font-bold text-tucker-blue sm:text-6xl">
          Lost & Found
        </h1>
        <div className="mt-6 max-w-3xl space-y-4">
          <p className="text-xl text-neutral-700">
            The J.R. Tucker High School Lost & Found is a centralized system
            for tracking and recovering lost items on campus.
          </p>
          <p className="text-lg text-neutral-600">
            This portal is available to all students, staff, and visitors. Use
            it to report items you've found, search for items you've lost, or
            claim items that match your description.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="font-display text-3xl font-semibold text-tucker-blue mb-8">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="border-l-4 border-tucker-blue pl-6">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-tucker-blue text-lg font-bold text-white">
              1
            </div>
            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-2">
              Report Found Items
            </h3>
            <p className="text-neutral-600">
              If you find an item on campus, log it here with the location and
              description. This helps us match items with their owners quickly.
            </p>
          </div>
          <div className="border-l-4 border-tucker-blue pl-6">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-tucker-blue text-lg font-bold text-white">
              2
            </div>
            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-2">
              Browse Available Items
            </h3>
            <p className="text-neutral-600">
              Search through items that have been turned in. Filter by location,
              date, or item type to find what you're looking for.
            </p>
          </div>
          <div className="border-l-4 border-tucker-blue pl-6">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-tucker-blue text-lg font-bold text-white">
              3
            </div>
            <h3 className="font-display text-xl font-semibold text-neutral-900 mb-2">
              Claim Your Item
            </h3>
            <p className="text-neutral-600">
              Found a match? Submit a claim with identifying details. You'll be
              notified to pick it up from the main office during school hours.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/report"
            className="group relative overflow-hidden rounded-lg border-2 border-tucker-blue bg-white px-8 py-6 transition-all hover:bg-tucker-blue hover:shadow-lg"
          >
            <div className="relative z-10">
              <h3 className="font-display text-xl font-semibold text-tucker-blue mb-2 group-hover:text-white transition-colors">
                Report Found Item
              </h3>
              <p className="text-sm text-neutral-600 group-hover:text-neutral-100 transition-colors">
                Log an item you found on campus
              </p>
            </div>
          </Link>
          <Link
            href="/browse"
            className="group relative overflow-hidden rounded-lg border-2 border-tucker-blue bg-white px-8 py-6 transition-all hover:bg-tucker-blue hover:shadow-lg"
          >
            <div className="relative z-10">
              <h3 className="font-display text-xl font-semibold text-tucker-blue mb-2 group-hover:text-white transition-colors">
                Browse Items
              </h3>
              <p className="text-sm text-neutral-600 group-hover:text-neutral-100 transition-colors">
                Search through available items
              </p>
            </div>
          </Link>
          <Link
            href="/claim"
            className="group relative overflow-hidden rounded-lg border-2 border-tiger-orange bg-tiger-orange px-8 py-6 transition-all hover:bg-tiger-orange-dark hover:shadow-lg"
          >
            <div className="relative z-10">
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                Claim an Item
              </h3>
              <p className="text-sm text-white/90">
                Submit a claim for your lost item
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Recently Logged Items */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-tucker-blue">
            Recently Logged Items
          </h2>
          <Link
            href="/browse"
            className="text-sm font-medium text-tucker-blue hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full gap-4 pb-4">
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="min-w-[280px] rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-semibold text-neutral-900">
                    {item.item}
                  </h3>
                  <span className="ml-2 rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                    {item.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-neutral-600">
                  <p>
                    <span className="font-medium">Location:</span> {item.location}
                  </p>
                  <p>
                    <span className="font-medium">Reported:</span> {item.date}
                  </p>
                </div>
                <Link
                  href={`/browse#item-${item.id}`}
                  className="mt-4 inline-block text-sm font-medium text-tucker-blue hover:underline"
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
