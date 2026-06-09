import Image from "next/image"
import Link from "next/link"
import { getRecipeTotalTime } from "@/lib/recipe-format"
import type { Recipe } from "@/lib/recipes"

type RecipeCardProps = {
  recipe: Recipe
  href: string
}

export function RecipeCard({ recipe, href }: RecipeCardProps) {
  const totalTime = getRecipeTotalTime(recipe)

  return (
    <article className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-stone-100">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-orange-700">
          <span>{recipe.cuisine}</span>
          <span>{recipe.difficulty}</span>
        </div>

        <h2 className="mt-3 text-xl font-semibold tracking-tight text-stone-950">
          <Link href={href} className="after:absolute after:inset-0">
            {recipe.name}
          </Link>
        </h2>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
          <span>{totalTime} min</span>
          <span>{recipe.servings} servings</span>
          <span>{recipe.rating.toFixed(1)} rating</span>
        </div>

        <ul className="mt-5 space-y-1 text-sm text-stone-700">
          {recipe.ingredients.slice(0, 3).map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
