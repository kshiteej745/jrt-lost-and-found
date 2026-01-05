export const categoryLabels: Record<string, string> = {
  keys: 'Keys',
  clothing: 'Clothing',
  electronics: 'Electronics',
  books: 'Books & School Supplies',
  bags: 'Bags & Backpacks',
  'water-bottles': 'Water Bottles',
  jewelry: 'Jewelry',
  'sports-equipment': 'Sports Equipment',
  other: 'Other',
}

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] || category
}

export function formatDateFound(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) {
    return 'Less than an hour ago'
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else if (diffDays === 1) {
    return '1 day ago'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }
}

