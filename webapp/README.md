# REA Web App

A standalone Next.js interface for the REA reverse-engineering toolkit.

## Development

Requirements: Node.js 22.23.4+ and npm 11+.

```bash
cd webapp
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

- `webapp/`: standalone Next.js application; deploy this directory as the Vercel project root.
- REA engine: remains in the repository root and performs local analysis through its existing CLI/MCP interfaces.
- Local companion: planned secure bridge between the browser UI and the REA process on the user's computer.
- AI interpretation: planned server-side integration for explaining REA evidence and generating reconstruction guidance.

The current interface is a UI foundation. It does not claim to run REA analysis until the local companion/API integration is implemented. Keep analysis targets and sensitive files local by default; do not expose an unauthenticated REA MCP HTTP endpoint to the public internet.
