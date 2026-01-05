import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.claim.deleteMany()
  await prisma.item.deleteMany()

  // Seed items
  const items = await prisma.item.createMany({
    data: [
      {
        title: 'Black backpack with red zipper',
        category: 'bags',
        description:
          'Black Jansport backpack with a distinctive red zipper pull. The backpack contains several notebooks, a pencil case, and a water bottle. There is a small keychain attached with a tiger mascot.',
        location: 'Cafeteria',
        dateFound: new Date('2024-01-15T10:30:00Z'),
        status: 'approved',
        reportedBy: 'Staff Member',
        photos: ['photo1.jpg', 'photo2.jpg'],
      },
      {
        title: 'Blue Hydro Flask water bottle',
        category: 'water-bottles',
        description:
          'Blue 32oz Hydro Flask water bottle with a black lid. The bottle has some stickers on it including a Tucker High School sticker. There are a few scratches on the bottom.',
        location: 'Gym',
        dateFound: new Date('2024-01-15T08:15:00Z'),
        status: 'approved',
        reportedBy: 'Student',
        photos: ['photo1.jpg'],
      },
      {
        title: 'TI-84 Plus calculator',
        category: 'electronics',
        description:
          'Texas Instruments TI-84 Plus graphing calculator in a black protective case. The calculator appears to be in good working condition. No identifying marks visible.',
        location: 'Library',
        dateFound: new Date('2024-01-14T14:20:00Z'),
        status: 'approved',
        reportedBy: 'Staff Member',
        photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
      },
      {
        title: 'Gray Nike hoodie',
        category: 'clothing',
        description:
          'Gray Nike hoodie, size Large. The hoodie has a small Tucker High School logo on the front left chest. There is a pen in the front pocket.',
        location: 'Hallway B',
        dateFound: new Date('2024-01-14T11:45:00Z'),
        status: 'approved',
        reportedBy: 'Staff Member',
        photos: ['photo1.jpg', 'photo2.jpg'],
      },
      {
        title: 'AirPods Pro in case',
        category: 'electronics',
        description:
          'Apple AirPods Pro (2nd generation) in a white charging case. The case has a small scratch on the lid. AirPods are inside and appear to be in working condition.',
        location: 'Auditorium',
        dateFound: new Date('2024-01-13T16:00:00Z'),
        status: 'approved',
        reportedBy: 'Student',
        photos: ['photo1.jpg'],
      },
      {
        title: 'Set of car keys with keychain',
        category: 'keys',
        description:
          'Set of keys on a keychain with a small leather tag. Includes car key (Honda), house key, and several smaller keys. The keychain has a small metal charm.',
        location: 'Parking lot',
        dateFound: new Date('2024-01-13T07:30:00Z'),
        status: 'approved',
        reportedBy: 'Staff Member',
        photos: ['photo1.jpg', 'photo2.jpg'],
      },
      {
        title: 'Chemistry textbook',
        category: 'books',
        description:
          'Chemistry textbook, "Chemistry: The Central Science" 14th edition. The book has a name written inside the cover (partially obscured). Some pages have highlighting and notes.',
        location: 'Science lab',
        dateFound: new Date('2024-01-12T13:15:00Z'),
        status: 'approved',
        reportedBy: 'Staff Member',
        photos: ['photo1.jpg'],
      },
      {
        title: 'Basketball',
        category: 'sports-equipment',
        description:
          'Orange basketball with "Spalding" branding. The ball is in good condition with normal wear. No personal markings visible.',
        location: 'Gym',
        dateFound: new Date('2024-01-11T15:00:00Z'),
        status: 'approved',
        reportedBy: 'Student',
        photos: ['photo1.jpg', 'photo2.jpg'],
      },
    ],
  })

  console.log(`Created ${items.count} items`)
  console.log('Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

