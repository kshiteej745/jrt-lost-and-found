'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { FileUpload } from '@/components/ui/FileUpload'

const categories = [
  { value: 'keys', label: 'Keys' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'books', label: 'Books & School Supplies' },
  { value: 'bags', label: 'Bags & Backpacks' },
  { value: 'water-bottles', label: 'Water Bottles' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'sports-equipment', label: 'Sports Equipment' },
  { value: 'other', label: 'Other' },
]

export default function ReportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    itemTitle: '',
    category: '',
    description: '',
    foundLocation: '',
    dateFound: '',
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setUploadProgress('')

    try {
      // Step 1: Upload photos to Cloudinary
      const photoUrls: string[] = []
      
      if (photos.length > 0) {
        setUploadProgress('Uploading photos...')
        
        for (let i = 0; i < photos.length; i++) {
          const formData = new FormData()
          formData.append('file', photos[i])

          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json()
            throw new Error(errorData.error || 'Failed to upload photo')
          }

          const uploadData = await uploadResponse.json()
          photoUrls.push(uploadData.url)
        }
      }

      // Step 2: Submit item data with photo URLs
      setUploadProgress('Submitting item...')

      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.itemTitle,
          category: formData.category,
          description: formData.description,
          location: formData.foundLocation,
          dateFound: formData.dateFound,
          photos: photoUrls,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.details
            ? errorData.details.map((d: any) => d.message).join(', ')
            : errorData.error || 'Failed to submit item'
        )
      }

      const data = await response.json()

      // Success - redirect to items page or show success message
      router.push(`/items?submitted=${data.item.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
      setIsSubmitting(false)
      setUploadProgress('')
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-tucker-blue sm:text-5xl">
          Report Found Item
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Help reunite lost items with their owners by reporting items you've found on campus.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-tucker-blue mb-6">
            Item Information
          </h2>
          
          <div className="space-y-6">
            <Input
              label="Item Title"
              name="itemTitle"
              type="text"
              value={formData.itemTitle}
              onChange={handleInputChange}
              placeholder="e.g., Black backpack with red zipper"
              helperText="A brief, descriptive title for the item"
              required
            />

            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              options={categories}
              helperText="Select the category that best matches the item"
              required
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the item in detail: color, size, brand, distinguishing features, etc."
              helperText="Include any details that would help identify the item"
              rows={5}
              required
            />
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-tucker-blue mb-6">
            Location & Date
          </h2>
          
          <div className="space-y-6">
            <Input
              label="Found Location"
              name="foundLocation"
              type="text"
              value={formData.foundLocation}
              onChange={handleInputChange}
              placeholder="e.g., Cafeteria, Hallway B, Gym locker room"
              helperText="Where on campus did you find this item?"
              required
            />

            <Input
              label="Date Found"
              name="dateFound"
              type="date"
              value={formData.dateFound}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]}
              helperText="The date you found the item"
              required
            />
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-tucker-blue mb-6">
            Photos
          </h2>
          
          <FileUpload
            label="Item Photos"
            helperText="Upload 1-3 clear photos of the item. Photos help owners identify their belongings."
            maxFiles={3}
            maxSizeMB={5}
            onFilesChange={setPhotos}
          />
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="font-semibold text-neutral-900 mb-2">Privacy & Safety</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            All submitted information will be reviewed by school staff before being made
            publicly visible. Personal items or sensitive information visible in photos
            will be handled with discretion. If you have concerns about an item, please
            contact the main office directly.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {uploadProgress && (
          <div className="rounded-lg border border-tucker-blue bg-blue-50 p-4">
            <p className="text-sm text-tucker-blue">{uploadProgress}</p>
          </div>
        )}

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push('/items')}
            disabled={isSubmitting}
            className="rounded-md border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-tucker-blue px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-tucker-blue-dark focus:outline-none focus:ring-2 focus:ring-tucker-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (uploadProgress || 'Submitting...') : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  )
}

