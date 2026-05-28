import Link from "next/link"
import { RecipeFilters } from "@/components/recipe-filters"
import { RecipePagination } from "@/components/recipe-pagination"
import { RecipeCard } from "@/components/recipe-card"
import { getRecipes, type RecipeSortField, type SortOrder } from "@/lib/recipes"

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const recipeSortFields: RecipeSortField[] = [
  "name",
  "rating",
  "prepTimeMinutes",
  "cookTimeMinutes",
  "caloriesPerServing",
]

const DEFAULT_RECIPES_PER_PAGE = 6
const recipesPerPageOptions = [6, 9, 15]

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function getSortBy(value: string | undefined) {
  return recipeSortFields.includes(value as RecipeSortField)
    ? (value as RecipeSortField)
    : undefined
}

function getOrder(value: string | undefined): SortOrder {
  return value === "desc" ? "desc" : "asc"
}

function getPage(value: string | undefined) {
  const page = Number(value)

  return Number.isInteger(page) && page > 0 ? page : 1
}

function getRecipesPerPage(value: string | undefined) {
  const perPage = Number(value)

  return recipesPerPageOptions.includes(perPage)
    ? perPage
    : DEFAULT_RECIPES_PER_PAGE
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const search = getSearchParam(params.q)?.trim() ?? ""
  const sortBy = getSortBy(getSearchParam(params.sortBy))
  const order = getOrder(getSearchParam(params.order))
  const currentPage = getPage(getSearchParam(params.page))
  const perPage = getRecipesPerPage(getSearchParam(params.perPage))
  const skip = (currentPage - 1) * perPage
  const resultsHeading = search ? "Search results" : "Recipes"
  const { recipes, total } = await getRecipes({
    search,
    sortBy,
    order,
    limit: perPage,
    skip,
  })
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  return (
    <main className="min-h-screen">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Cucinetta
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
          Recipe finder
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-stone-950 md:text-6xl">
          Find something good to cook tonight.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
          Cucinetta is a small recipe browser for simple home cooking ideas.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <RecipeFilters
          search={search}
          sortBy={sortBy}
          order={order}
        />

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
              Recipes
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              {resultsHeading}
            </h2>
          </div>
          <p className="text-sm text-stone-600">{total} recipes</p>
        </div>

        {recipes.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            <RecipePagination
              currentPage={currentPage}
              totalPages={totalPages}
              search={search}
              sortBy={sortBy}
              order={order}
              perPage={perPage}
            />
          </>
        ) : (
          <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center text-stone-600">
            No recipes found.
          </div>
        )}
      </section>
    </main>
  )
}
