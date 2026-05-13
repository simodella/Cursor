# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is a Preact + Vite chat widget application (`my-chat/`) that embeds a RelevanceAI-powered chatbot on a HiBob-inspired landing page. All source code lives under `my-chat/`.

### Development commands

All commands run from the `my-chat/` directory:

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite on port 5173) |
| Lint | `npx biome check ./src` |
| Type check | `npx tsc --noEmit` |
| Build | `npm run build` |

### Non-obvious notes

- **Package manager**: Uses npm (lockfile is `package-lock.json`).
- **Environment variables**: The app reads `VITE_REGION`, `VITE_PROJECT`, `VITE_AGENT_ID`, and `VITE_WORKFORCE_ID` at build/dev time. Without these the chat widget shows "Connecting assistant..." but the landing page and UI still render. Create a `.env` file in `my-chat/` or pass them on the command line to enable the AI chat features.
- **Pre-existing lint/type issues**: Biome reports formatting diffs and Tailwind CSS `@apply`/`@custom-variant` as unknown at-rules. TypeScript reports missing exports from `@relevanceai/sdk` (the SDK's published types may lag behind usage). Neither blocks the dev server or build.
- **Biome is the linter**: There is no ESLint; Biome handles both linting and formatting. Config is in `my-chat/biome.json`.
- **Preact, not React**: The project uses Preact with `preact/compat` aliased to `react`/`react-dom` via `tsconfig.json` paths and `@preact/preset-vite`.
