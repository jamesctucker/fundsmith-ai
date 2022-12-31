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
4. Create a new postgres user with `createuser --superuser fundsmith -s -i -d -r -l -w`
5. Add `postgresql://fundsmith:Solveig2020!@localhost:5432/fundsmith_development?schema=public` to the `DATABASE_URL` key in your `env`
6. Set-up your new database using your Prisma schema with `npx prisma migrate dev`
7. Fill out the other .env values (You will need access to our Clerk auth API keys)
8. Run the app with `npm run dev`

## Webhooks

TODO: explain why webhooks from Clerk.dev are needed.

- User created webhook
  - inserts a copy of the Clerk user object into our db
  - creates a default workspace for the user
