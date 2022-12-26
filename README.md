## Fundsmith

This app comprises of the following stack:

- Next.js
- TypeScript
- Prisma
- tRPC
- Postgres
- Clerk auth

## Get up and running on your machine

1. Clone the repo
2. `npm install`
3. `cp .env.example .env
4. Create a new Postgres database with `createdb -U postgres -h localhost -p 5432 dev/fundsmith_dev`
5. Grab the new database's URL and add it to the `DATABASE_URL` key in your `env`
6. Fill out the other .env values (You will need access to our Clerk auth API keys)
7. Set-up your new database using your Prisma schema with `npx prisma migrate dev`
8. Run the app with `npm run dev`
