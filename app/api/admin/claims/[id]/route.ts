import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid claim ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status } = body

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, approved, rejected' },
        { status: 400 }
      )
    }

    // Update claim status
    const claim = await prisma.claim.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        itemId: true,
        claimantName: true,
        status: true,
      },
    })

    // If claim is approved, update item status to 'claimed'
    if (status === 'approved') {
      await prisma.item.update({
        where: { id: claim.itemId },
        data: { status: 'claimed' },
      })
    }

    return NextResponse.json({
      success: true,
      claim,
    })
  } catch (error) {
    console.error('Error updating claim:', error)
    return NextResponse.json(
      {
        error: 'Failed to update claim. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use PATCH to update claims.' },
    { status: 405 }
  )
}

