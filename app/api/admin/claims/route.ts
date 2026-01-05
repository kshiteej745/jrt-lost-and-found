import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || 'pending'

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status filter' },
        { status: 400 }
      )
    }

    const claims = await prisma.claim.findMany({
      where: { status },
      orderBy: { submittedDate: 'desc' },
      include: {
        item: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: claims,
    })
  } catch (error) {
    console.error('Error fetching claims:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch claims. Please try again.',
      },
      { status: 500 }
    )
  }
}

