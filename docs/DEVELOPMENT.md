# FindFlix

The frontend for this project is written using the popular javascript library [React](https://reactjs.org/), specifically using the framework [Next.js](https://nextjs.org/).

The frontend also utilizes other technologies like:

- [ESLint](https://eslint.org/)
- [PostCSS](https://postcss.org/)
- [Prettier](https://prettier.io/)
- [Tailwind](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Developing

### Without Docker

To setup the frontend for local development you must first ensure that you have the following dependencies installed:

- [NodeJS](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)

Now you can install the project specific dependencies using:

```bash
pnpm install
```

Then you must specify a value for the following environment variables:

```bash
# Base URL of TMDB (this can stay the same)
TMDB_API_BASE_URL=https://api.themoviedb.org/
# Base URL of TMDB images (this can stay the same)
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
# API key for the movie db https://developers.themoviedb.org/3
TMDB_API_KEY=
# List ID for public list on TMDB (this is not required)
TMDB_FAVOURITES_LIST_ID=
# Base url for watching content by TMDB ids (this is not required)
TMDB_WATCH_BASE_URL=
```

This can be done by filling out and copying the `example.env` file to a `.env` file.

Once the project dependencies are installed and environment variables specified you can start a development server using:

```bash
pnpm dev
```

### With Docker

To setup the frontend for local development you can also use [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

You can run the application using the following command:

```bash
docker-compose up --build
```

## Building

You can build a production version of the application using:

```bash
pnpm build
```

## Linting

You can lint the project using:

```bash
pnpm lint
```

## Formatting

You can format the project using:

```bash
pnpm format:fix
```
