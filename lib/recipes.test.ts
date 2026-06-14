import { afterEach, describe, expect, it, vi } from "vitest"
import {
  getRecipeById,
  getRecipes,
  getRecipesUrl,
  RECIPES_REVALIDATE_SECONDS,
} from "@/lib/recipes"

describe("getRecipesUrl", () => {
  it("builds the default recipes list url", () => {
    expect(getRecipesUrl().toString()).toBe("https://dummyjson.com/recipes")
  })

  it("builds a search url with trimmed query and pagination", () => {
    expect(
      getRecipesUrl({
        search: "  chicken  ",
        limit: 6,
        skip: 12,
      }).toString()
    ).toBe("https://dummyjson.com/recipes/search?q=chicken&limit=6&skip=12")
  })

  it("adds sort params with ascending order by default", () => {
    expect(
      getRecipesUrl({
        sortBy: "rating",
      }).toString()
    ).toBe("https://dummyjson.com/recipes?sortBy=rating&order=asc")
  })

  it("uses descending order when provided", () => {
    expect(
      getRecipesUrl({
        sortBy: "name",
        order: "desc",
      }).toString()
    ).toBe("https://dummyjson.com/recipes?sortBy=name&order=desc")
  })
})

describe("recipes api client", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("fetches recipes with cache revalidation", async () => {
    const recipesResponse = {
      recipes: [{ id: 1, name: "Pizza" }],
      total: 1,
      skip: 0,
      limit: 1,
    }

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => recipesResponse,
    })

    vi.stubGlobal("fetch", fetchMock)

    await expect(getRecipes({ limit: 1 })).resolves.toEqual(recipesResponse)
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/recipes?limit=1",
      { next: { revalidate: RECIPES_REVALIDATE_SECONDS } }
    )
  })

  it("fetches a recipe by id", async () => {
    const recipe = { id: 4, name: "Chicken Alfredo Pasta" }

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => recipe,
    })

    vi.stubGlobal("fetch", fetchMock)

    await expect(getRecipeById(4)).resolves.toEqual(recipe)
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/recipes/4",
      { next: { revalidate: RECIPES_REVALIDATE_SECONDS } }
    )
  })

  it("throws when the api responds with an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    )

    await expect(getRecipes()).rejects.toThrow(
      "DummyJSON request failed with status 500"
    )
  })
})
