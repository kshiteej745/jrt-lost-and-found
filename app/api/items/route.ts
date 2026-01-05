import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { itemSchema } from '@/lib/validations/item'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input with Zod
    const validationResult = itemSchema.safeParse(body)

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

    // Create item in database with status = 'pending'
    const item = await prisma.item.create({
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        location: data.location,
        dateFound: new Date(data.dateFound),
        status: 'pending',
        photos: data.photos,
        reportedBy: data.reportedBy || null,
      },
    })

    return NextResponse.json(
      {
        success: true,
        item: {
          id: item.id,
          title: item.title,
          status: item.status,
          createdAt: item.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json(
      {
        error: 'Failed to create item. Please try again.',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const sort = searchParams.get('sort') || 'newest'
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)

    // Validate pagination params
    const pageNum = Math.max(1, page)
    const limitNum = Math.min(Math.max(1, limit), 100) // Max 100 items per page
    const skip = (pageNum - 1) * limitNum

    // Build where clause - only return APPROVED items
    const where: any = {
      status: 'approved',
    }

    // Add search filter
    if (q.trim()) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { location: { contains: q, mode: 'insensitive' } },
      ]
    }

    // Add category filter
    if (category && category !== 'all') {
      where.category = category
    }

    // Build orderBy clause
    const orderBy: any = {}
    if (sort === 'oldest') {
      orderBy.dateFound = 'asc'
    } else {
      orderBy.dateFound = 'desc' // newest (default)
    }

    // Get items and total count
    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        select: {
          id: true,
          title: true,
          category: true,
          location: true,
          dateFound: true,
          photos: true,
          status: true,
        },
      }),
      prisma.item.count({ where }),
    ])

    // Format response with pagination metadata
    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasMore: skip + items.length < total,
      },
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

