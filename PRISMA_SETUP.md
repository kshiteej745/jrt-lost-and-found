# Prisma Setup Instructions

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/jrt_lost_and_found?schema=public"
   ```
   Replace `user`, `password`, `localhost`, `5432`, and `jrt_lost_and_found` with your actual PostgreSQL credentials.

3. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```

4. **Push schema to database (for development):**
   ```bash
   npm run db:push
   ```
   Or create a migration:
   ```bash
   npm run db:migrate
   ```

5. **Seed the database:**
   ```bash
   npm run db:seed
   ```

## Available Commands

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database (development)
- `npm run db:migrate` - Create and apply a migration
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Run the seed script

## Database Schema

The schema includes two models:

- **Item**: Lost and found items with status, category, location, photos, etc.
- **Claim**: Claims submitted by users for items, linked to items via foreign key

