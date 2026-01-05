import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { claimSchema } from '@/lib/validations/claim'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = parseInt(params.id, 10)

    if (isNaN(itemId)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      )
    }

    // Verify item exists and is claimable
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: { id: true, status: true },
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    if (item.status !== 'approved') {
      return NextResponse.json(
        {
          error: 'This item is not available for claiming.',
        },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Validate input with Zod
    const validationResult = claimSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Create claim with status = 'pending' (matching schema)
    const claim = await prisma.claim.create({
      data: {
        itemId,
        claimantName: data.claimantName,
        claimantEmail: data.claimantEmail,
        message: data.message || null,
        proofDescription: data.proofDescription,
        status: 'pending',
      },
      select: {
        id: true,
        itemId: true,
        claimantName: true,
        claimantEmail: true,
        status: true,
        submittedDate: true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        claim: {
          id: claim.id,
          itemId: claim.itemId,
          status: claim.status,
          submittedDate: claim.submittedDate,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating claim:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit claim. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create claims.' },
    { status: 405 }
  )
}

