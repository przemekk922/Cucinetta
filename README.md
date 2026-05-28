# Cucinetta

Cucinetta is a small recipe browser built with Next.js, React, TypeScript and Tailwind CSS. It uses the DummyJSON Recipes API to show recipes with search, sorting, pagination and detail pages.

Live app: [https://cucinetta.vercel.app/](https://cucinetta.vercel.app/)

## Features

- Browse recipes from DummyJSON
- Search recipes by phrase
- Sort results by name, rating, prep time, cook time or calories
- Change the number of recipes shown per page
- Navigate between pages of results
- Open a recipe details page with ingredients and instructions
- Keep search, sorting and pagination state in the URL

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui Select
- Native `fetch`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## API

Recipe data comes from [DummyJSON Recipes](https://dummyjson.com/docs/recipes).
