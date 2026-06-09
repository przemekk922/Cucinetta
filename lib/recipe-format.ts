import type { Recipe } from "@/lib/recipes"

export function getRecipeTotalTime(
  recipe: Pick<Recipe, "prepTimeMinutes" | "cookTimeMinutes">
) {
  return recipe.prepTimeMinutes + recipe.cookTimeMinutes
}
