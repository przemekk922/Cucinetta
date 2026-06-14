import { describe, expect, it } from "vitest"
import { getRecipeTotalTime } from "@/lib/recipe-format"

describe("getRecipeTotalTime", () => {
  it("adds prep and cook time together", () => {
    expect(
      getRecipeTotalTime({
        prepTimeMinutes: 20,
        cookTimeMinutes: 15,
      })
    ).toBe(35)
  })
})
