# FORMHAUS Frontend

A premium Next.js storefront for the FORMHAUS.STUDIO brand.

## Stack
- Next.js 14
- React + TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- React Three Fiber

## Local setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment

The app reads its API base URL from `.env.local`.

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## API contract

The public frontend consumes:

- `GET /api/site`
- `GET /api/health`

The admin dashboard is served by the backend under:

- `http://localhost:4000/admin`

## Deployment

- Deploy the frontend separately from the backend on a Node-compatible hosting environment.
- Ensure the `NEXT_PUBLIC_API_URL` points to the production backend API domain.
- Example: `https://api.formhaus.studio/api`
