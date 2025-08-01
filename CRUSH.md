# Commands
- Build: `bun run build`
- Dev: `bun run dev`
- Lint: `bun run lint`
- Format: `bun run format`
- DB Generate: `bun run db:generate`
- DB Push: `bun run db:push`
- DB Seed: `bun run db:seed`

# Code Style
- TypeScript strict mode enabled
- No semicolons
- Single quotes for strings
- Trailing commas required
- Import aliases: use @/* for src directory imports
- Use named exports over default exports
- Error handling: use zod for validation, tiny-invariant for assertions
- Naming: PascalCase for components, camelCase for functions/variables
- Types: prefer type over interface, use explicit return types
- React: use functional components with hooks
- State: use tRPC for API, Tanstack Query for client state
- Auth: NextAuth.js with Prisma adapter
- Styling: Tailwind CSS with prettier-plugin-tailwindcss
- API: tRPC with zod validation
- Testing: Not configured (TODO)