import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || 'pending'

    // Validate status
    const validStatuses = ['pending', 'approved', 'claimed', 'returned']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status filter' },
        { status: 400 }
      )
    }

    const items = await prisma.item.findMany({
      where: { status },
      orderBy: { dateFound: 'desc' },
      select: {
        id: true,
        title: true,
        category: true,
        location: true,
        dateFound: true,
        reportedBy: true,
        status: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: items,
    })
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch items. Please try again.',
      },
      { status: 500 }
    )
  }
}

