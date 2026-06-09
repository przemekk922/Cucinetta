"use client"

import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type RecipeListParams,
  recipeSortOptions,
} from "@/lib/recipe-list-params"

type RecipeFiltersProps = Pick<RecipeListParams, "search" | "sortBy" | "order">

export function RecipeFilters({
  search,
  sortBy,
  order,
}: RecipeFiltersProps) {
  const clearLinkClassName = search
    ? "pb-2 text-md font-medium text-stone-600 transition hover:text-stone-950"
    : "pointer-events-none invisible pb-2 text-md font-medium text-stone-600"

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
        <Select
          name="sortBy"
          defaultValue={sortBy ?? "default"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            {recipeSortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <label className="grid gap-2 text-sm font-medium text-stone-700">
        Order
        <Select
          name="order"
          defaultValue={order}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </label>

      <div className="flex items-end gap-3">
        <button
          type="submit"
          className="h-11 rounded-full bg-stone-950 px-6 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Apply
        </button>
        <Link href="/" className={clearLinkClassName}>
          Clear
        </Link>
      </div>
    </form>
  )
}
