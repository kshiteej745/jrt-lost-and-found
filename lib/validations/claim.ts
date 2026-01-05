import { z } from 'zod'

export const claimSchema = z.object({
  claimantName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  claimantEmail: z
    .string()
    .email('Invalid email address')
    .refine(
      (email) => email.endsWith('@tuckerhs.edu') || email.includes('@'),
      {
        message: 'Please use a valid school email address',
      }
    ),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
  proofDescription: z
    .string()
    .min(10, 'Proof description must be at least 10 characters')
    .max(2000, 'Proof description must be less than 2000 characters'),
})

export type ClaimInput = z.infer<typeof claimSchema>

