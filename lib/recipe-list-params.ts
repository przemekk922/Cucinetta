import type { RecipeSortField, SortOrder } from "@/lib/recipes"

export type RawSearchParams = Record<string, string | string[] | undefined>

export type RecipeListParams = {
  search: string
  sortBy?: RecipeSortField
  order: SortOrder
  currentPage: number
  perPage: number
}

export const DEFAULT_RECIPES_PER_PAGE = 6
export const recipesPerPageOptions = [6, 9, 15]

export const recipeSortOptions: Array<{
  label: string
  value: RecipeSortField
}> = [
  { label: "Name", value: "name" },
  { label: "Rating", value: "rating" },
  { label: "Prep time", value: "prepTimeMinutes" },
  { label: "Cook time", value: "cookTimeMinutes" },
  { label: "Calories", value: "caloriesPerServing" },
]

const recipeSortFields = recipeSortOptions.map((option) => option.value)

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

export function parseRecipeListParams(params: RawSearchParams): RecipeListParams {
  return {
    search: getSearchParam(params.q)?.trim() ?? "",
    sortBy: getSortBy(getSearchParam(params.sortBy)),
    order: getOrder(getSearchParam(params.order)),
    currentPage: getPage(getSearchParam(params.page)),
    perPage: getRecipesPerPage(getSearchParam(params.perPage)),
  }
}

export function getRecipeListSearchParams({
  search,
  sortBy,
  order,
  currentPage,
  perPage,
}: RecipeListParams) {
  const params = new URLSearchParams()

  if (search) {
    params.set("q", search)
  }

  if (sortBy) {
    params.set("sortBy", sortBy)
    params.set("order", order)
  }

  if (currentPage > 1) {
    params.set("page", String(currentPage))
  }

  if (perPage !== DEFAULT_RECIPES_PER_PAGE) {
    params.set("perPage", String(perPage))
  }

  return params
}

export function getRecipeListHref(params: RecipeListParams) {
  const queryString = getRecipeListSearchParams(params).toString()

  return queryString ? `/?${queryString}` : "/"
}

export function getRecipeDetailsHref(recipeId: number, params: RecipeListParams) {
  const queryString = getRecipeListSearchParams(params).toString()

  return queryString ? `/recipes/${recipeId}?${queryString}` : `/recipes/${recipeId}`
}
