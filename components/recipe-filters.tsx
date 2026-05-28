import Link from "next/link"
import type { RecipeSortField, SortOrder } from "@/lib/recipes"

type RecipeFiltersProps = {
  search: string
  sortBy?: RecipeSortField
  order: SortOrder
}

const sortOptions: Array<{ label: string; value: RecipeSortField }> = [
  { label: "Name", value: "name" },
  { label: "Rating", value: "rating" },
  { label: "Prep time", value: "prepTimeMinutes" },
  { label: "Cook time", value: "cookTimeMinutes" },
  { label: "Calories", value: "caloriesPerServing" },
]

export function RecipeFilters({
  search,
  sortBy,
  order,
}: RecipeFiltersProps) {
  const hasActiveFilters = Boolean(search || sortBy)

  return (
    <form
      action="/"
      className="mb-8 grid gap-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_180px_160px_auto]"
    >
      <label className="grid gap-2 text-sm font-medium text-stone-700">
        Search
        <input
          name="q"
          type="search"
          defaultValue={search}
          placeholder="Chicken, pasta, curry..."
          className="h-11 rounded-full border border-stone-300 px-4 text-base font-normal text-stone-950 outline-none transition focus:border-orange-600"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-stone-700">
        Sort by
        <select
          name="sortBy"
          defaultValue={sortBy ?? ""}
          className="h-11 rounded-full border border-stone-300 px-4 text-base font-normal text-stone-950 outline-none transition focus:border-orange-600"
        >
          <option value="">Default</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-medium text-stone-700">
        Order
        <select
          name="order"
          defaultValue={order}
          className="h-11 rounded-full border border-stone-300 px-4 text-base font-normal text-stone-950 outline-none transition focus:border-orange-600"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      <div className="flex items-end gap-3">
        <button
          type="submit"
          className="h-11 rounded-full bg-stone-950 px-6 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Apply
        </button>
        {hasActiveFilters ? (
          <Link
            href="/"
            className="pb-2 text-md font-medium text-stone-600 transition hover:text-stone-950"
          >
            Clear
          </Link>
        ) : null}
      </div>
    </form>
  )
}
