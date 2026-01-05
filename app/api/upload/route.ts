import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Invalid file type. Only PNG, JPG, and WebP images are allowed.',
        },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds 5MB limit. File size: ${(
            file.size /
            (1024 * 1024)
          ).toFixed(2)}MB`,
        },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    try {
      const result = await uploadToCloudinary(file, 'lost-and-found')

      return NextResponse.json(
        {
          success: true,
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          size: result.bytes,
        },
        { status: 200 }
      )
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError)
      return NextResponse.json(
        {
          error: 'Failed to upload image to Cloudinary. Please try again.',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Upload route error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the upload.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to upload files.' },
    { status: 405 }
  )
}

