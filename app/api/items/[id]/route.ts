import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
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

    const item = await prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        location: true,
        dateFound: true,
        status: true,
        photos: true,
        reportedBy: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    // Only return approved items publicly
    if (item.status !== 'approved') {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: item,
    })
  } catch (error) {
    console.error('Error fetching item:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch item. Please try again.',
      },
      { status: 500 }
    )
  }
}

