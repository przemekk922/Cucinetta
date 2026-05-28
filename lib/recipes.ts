const RECIPES_API_URL = "https://dummyjson.com/recipes";

export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
};

export type RecipesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};

export type RecipeSortField =
  | "name"
  | "rating"
  | "prepTimeMinutes"
  | "cookTimeMinutes"
  | "caloriesPerServing";

export type SortOrder = "asc" | "desc";

export type GetRecipesOptions = {
  search?: string;
  limit?: number;
  skip?: number;
  sortBy?: RecipeSortField;
  order?: SortOrder;
};

async function fetchFromRecipesApi<ResponseData>(url: URL) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`DummyJSON request failed with status ${response.status}`);
  }

  return response.json() as Promise<ResponseData>;
}

function appendNumberParam(params: URLSearchParams, name: string, value?: number) {
  if (typeof value === "number") {
    params.set(name, String(value));
  }
}

export function getRecipesUrl({
  search,
  limit,
  skip,
  sortBy,
  order,
}: GetRecipesOptions = {}) {
  const searchPhrase = search?.trim();
  const url = new URL(searchPhrase ? `${RECIPES_API_URL}/search` : RECIPES_API_URL);

  if (searchPhrase) {
    url.searchParams.set("q", searchPhrase);
  }

  appendNumberParam(url.searchParams, "limit", limit);
  appendNumberParam(url.searchParams, "skip", skip);

  if (sortBy) {
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("order", order ?? "asc");
  }

  return url;
}

export async function getRecipes(options: GetRecipesOptions = {}) {
  return fetchFromRecipesApi<RecipesResponse>(getRecipesUrl(options));
}

export async function getRecipeById(recipeId: number) {
  const url = new URL(`${RECIPES_API_URL}/${recipeId}`);

  return fetchFromRecipesApi<Recipe>(url);
}
