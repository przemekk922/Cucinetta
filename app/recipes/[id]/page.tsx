import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import {
  getRecipeListHref,
  parseRecipeListParams,
  type RawSearchParams,
} from "@/lib/recipe-list-params"
import { getRecipeTotalTime } from "@/lib/recipe-format"
import { getRecipeById } from "@/lib/recipes"

type RecipePageProps = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<RawSearchParams>
}

async function getRecipe(recipeId: string) {
  const parsedRecipeId = Number(recipeId)

  if (!Number.isInteger(parsedRecipeId) || parsedRecipeId < 1) {
    notFound()
  }

  try {
    return await getRecipeById(parsedRecipeId)
  } catch {
    notFound()
  }
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { id } = await params
  const recipe = await getRecipe(id)

  return {
    title: `${recipe.name} | Cucinetta`,
    description: `${recipe.name} recipe with ingredients and cooking steps.`,
  }
}

export default async function RecipePage({
  params,
  searchParams,
}: RecipePageProps) {
  const { id } = await params
  const listParams = await searchParams
  const recipe = await getRecipe(id)
  const backHref = getRecipeListHref(parseRecipeListParams(listParams))
  const totalTime = getRecipeTotalTime(recipe)

  return (
    <main className="min-h-screen">
      <SiteHeader>
        <Link
          href={backHref}
          className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
        >
          Back to recipes
        </Link>
      </SiteHeader>

      <article className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <div className="relative aspect-[4/3] bg-stone-100">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
              {recipe.cuisine}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl">
              {recipe.name}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-600">
              <span>{recipe.difficulty}</span>
              <span>{totalTime} min</span>
              <span>{recipe.servings} servings</span>
              <span>{recipe.rating.toFixed(1)} rating</span>
              <span>{recipe.caloriesPerServing} kcal</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight">
              Ingredients
            </h2>
            <ul className="mt-5 space-y-2 text-stone-700">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight">
              Instructions
            </h2>
            <ol className="mt-5 space-y-4 text-stone-700">
              {recipe.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </main>
  )
}
