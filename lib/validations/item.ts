import { z } from 'zod'

export const itemSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  category: z.enum([
    'keys',
    'clothing',
    'electronics',
    'books',
    'bags',
    'water-bottles',
    'jewelry',
    'sports-equipment',
    'other',
  ]),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters'),
  dateFound: z.string().refine(
    (date) => {
      const parsedDate = new Date(date)
      return !isNaN(parsedDate.getTime()) && parsedDate <= new Date()
    },
    {
      message: 'Date found must be a valid date and cannot be in the future',
    }
  ),
  photos: z
    .array(z.string().url('Each photo must be a valid URL'))
    .min(0, 'At least one photo is recommended')
    .max(3, 'Maximum 3 photos allowed'),
  reportedBy: z.string().optional(),
})

export type ItemInput = z.infer<typeof itemSchema>

