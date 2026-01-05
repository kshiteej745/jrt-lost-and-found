interface StatusBadgeProps {
  status: 'approved' | 'claimed' | 'returned' | 'unclaimed'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    approved: {
      label: 'Approved',
      className: 'bg-tucker-blue text-white',
    },
    claimed: {
      label: 'Claimed',
      className: 'bg-tiger-orange text-white',
    },
    returned: {
      label: 'Returned',
      className: 'bg-green-600 text-white',
    },
    unclaimed: {
      label: 'Unclaimed',
      className: 'bg-neutral-200 text-neutral-700',
    },
  }

  const config = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}

