"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  getRecipeListHref,
  type RecipeListParams,
  recipesPerPageOptions,
} from "@/lib/recipe-list-params"

type RecipePaginationProps = Pick<
  RecipeListParams,
  "currentPage" | "search" | "sortBy" | "order" | "perPage"
> & {
  totalPages: number
}

export function RecipePagination({
  currentPage,
  totalPages,
  search,
  sortBy,
  order,
  perPage,
}: RecipePaginationProps) {
  const previousPage = currentPage - 1
  const nextPage = currentPage + 1
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages
  const router = useRouter()

  function handlePerPageChange(value: string) {
    router.push(
      getRecipeListHref({
        currentPage: 1,
        search,
        sortBy,
        order,
        perPage: Number(value),
      })
    )
  }

  return (
    <nav
      aria-label="Recipe pages"
      className="mt-10 grid gap-4 rounded-3xl border border-stone-200 bg-white p-4 text-sm sm:grid-cols-3 sm:items-center"
    >
      <div className="flex items-center gap-2 text-stone-600">
        <span className="font-medium text-stone-700" id="per-page-label">
          Per page
        </span>
        <Select
          value={String(perPage)}
          onValueChange={handlePerPageChange}
        >
          <SelectTrigger
            aria-labelledby="per-page-label"
            className="w-24"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {recipesPerPageOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-center text-stone-600">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex gap-3 sm:justify-end">
        {hasPreviousPage ? (
          <Link
            href={getRecipeListHref({
              currentPage: previousPage,
              search,
              sortBy,
              order,
              perPage,
            })}
            className="rounded-full border border-stone-300 px-4 py-2 font-medium text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-full border border-stone-200 px-4 py-2 font-medium text-stone-400">
            Previous
          </span>
        )}

        {hasNextPage ? (
          <Link
            href={getRecipeListHref({
              currentPage: nextPage,
              search,
              sortBy,
              order,
              perPage,
            })}
            className="rounded-full bg-stone-950 px-4 py-2 font-medium text-white transition hover:bg-stone-800"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-full bg-stone-200 px-4 py-2 font-medium text-stone-500">
            Next
          </span>
        )}
      </div>
    </nav>
  )
}
