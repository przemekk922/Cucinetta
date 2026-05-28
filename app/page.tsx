import Link from "next/link"
import { RecipeCard } from "@/components/recipe-card"
import { getRecipes } from "@/lib/recipes"

export default async function Home() {
  const { recipes } = await getRecipes({ limit: 6 })

  return (
    <main className="min-h-screen">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Cucinetta
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
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
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
              Recipes
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Popular picks
            </h2>
          </div>
          <p className="text-sm text-stone-600">{recipes.length} recipes</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </main>
  )
}
