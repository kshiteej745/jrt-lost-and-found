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
        { error: 'Invalid item ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status } = body

    // Validate status
    const validStatuses = ['pending', 'approved', 'claimed', 'returned']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, approved, claimed, returned' },
        { status: 400 }
      )
    }

    // Update item status
    const item = await prisma.item.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        title: true,
        status: true,
      },
    })

    return NextResponse.json({
      success: true,
      item,
    })
  } catch (error) {
    console.error('Error updating item:', error)
    return NextResponse.json(
      {
        error: 'Failed to update item. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use PATCH to update items.' },
    { status: 405 }
  )
}

