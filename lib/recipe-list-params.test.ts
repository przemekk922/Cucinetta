import { describe, expect, it } from "vitest"
import {
  getRecipeDetailsHref,
  getRecipeListHref,
  getRecipeListSearchParams,
  parseRecipeListParams,
} from "@/lib/recipe-list-params"

describe("parseRecipeListParams", () => {
  it("returns defaults for an empty query", () => {
    expect(parseRecipeListParams({})).toEqual({
      search: "",
      sortBy: undefined,
      order: "asc",
      currentPage: 1,
      perPage: 6,
    })
  })

  it("parses search, sort and pagination values", () => {
    expect(
      parseRecipeListParams({
        q: "  chicken  ",
        sortBy: "rating",
        order: "desc",
        page: "2",
        perPage: "9",
      })
    ).toEqual({
      search: "chicken",
      sortBy: "rating",
      order: "desc",
      currentPage: 2,
      perPage: 9,
    })
  })

  it("ignores invalid sort, page and per page values", () => {
    expect(
      parseRecipeListParams({
        sortBy: "invalid",
        page: "0",
        perPage: "20",
      })
    ).toEqual({
      search: "",
      sortBy: undefined,
      order: "asc",
      currentPage: 1,
      perPage: 6,
    })
  })

  it("uses the first value when a query param is repeated", () => {
    expect(parseRecipeListParams({ q: ["pasta", "chicken"] })).toEqual({
      search: "pasta",
      sortBy: undefined,
      order: "asc",
      currentPage: 1,
      perPage: 6,
    })
  })
})

describe("recipe list links", () => {
  const listParams = {
    search: "chicken",
    sortBy: "name" as const,
    order: "desc" as const,
    currentPage: 2,
    perPage: 9,
  }

  it("builds a query string with active filters", () => {
    expect(getRecipeListSearchParams(listParams).toString()).toBe(
      "q=chicken&sortBy=name&order=desc&page=2&perPage=9"
    )
  })

  it("builds list and details links that preserve filters", () => {
    expect(getRecipeListHref(listParams)).toBe(
      "/?q=chicken&sortBy=name&order=desc&page=2&perPage=9"
    )
    expect(getRecipeDetailsHref(4, listParams)).toBe(
      "/recipes/4?q=chicken&sortBy=name&order=desc&page=2&perPage=9"
    )
  })

  it("omits default page and per page values from links", () => {
    expect(
      getRecipeListHref({
        search: "",
        sortBy: undefined,
        order: "asc",
        currentPage: 1,
        perPage: 6,
      })
    ).toBe("/")
  })
})
