# H-Tube / HyperTube Frontend

Movie streaming frontend built with Next.js, TypeScript, and Tailwind CSS.

## Current Routes

- `/` - landing page
- `/movies/[id]` - movie details page
- `/movies/[id]/watch` - watch/player placeholder page

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

The movie metadata API base URL can be configured with:

```bash
NEXT_PUBLIC_MOVIE_API_BASE_URL=https://yts.am/api/v2
```

If the variable is not set, the frontend falls back to the same URL for local development.

## Data Boundaries

- API access is centralized in `lib/moviesApi.ts`.
- Raw API movies are normalized in `lib/movieMappers.ts`.
- Shared movie types live in `types/movie.ts`.
- Temporary fallback movies, comments, and watchlist data live in `data/`.

The frontend uses movie metadata and image URLs only. Playback is currently a safe placeholder/sample-video flow until a legal backend streaming source is connected.

## Verification

```bash
npm run lint
npm run build
```
