import Link from "next/link"
import type { RecipeSortField, SortOrder } from "@/lib/recipes"

type RecipePaginationProps = {
  currentPage: number
  totalPages: number
  search: string
  sortBy?: RecipeSortField
  order: SortOrder
  perPage: number
}

function getPageHref({
  page,
  search,
  sortBy,
  order,
  perPage,
}: Omit<RecipePaginationProps, "currentPage" | "totalPages"> & {
  page: number
}) {
  const params = new URLSearchParams()

  if (search) {
    params.set("q", search)
  }

  if (sortBy) {
    params.set("sortBy", sortBy)
    params.set("order", order)
  }

  if (page > 1) {
    params.set("page", String(page))
  }

  if (perPage !== 6) {
    params.set("perPage", String(perPage))
  }

  const queryString = params.toString()

  return queryString ? `/?${queryString}` : "/"
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

  return (
    <nav
      aria-label="Recipe pages"
      className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white p-4 text-sm sm:flex-row"
    >
      <div className="flex flex-col gap-3 text-stone-600 sm:flex-row sm:items-center">
        <p>
          Page {currentPage} of {totalPages}
        </p>

        <form action="/" className="flex items-center gap-2">
          {search ? <input type="hidden" name="q" value={search} /> : null}
          {sortBy ? (
            <>
              <input type="hidden" name="sortBy" value={sortBy} />
              <input type="hidden" name="order" value={order} />
            </>
          ) : null}

          <label htmlFor="perPage" className="font-medium text-stone-700">
            Per page
          </label>
          <select
            id="perPage"
            name="perPage"
            defaultValue={perPage}
            className="rounded-full border border-stone-300 px-3 py-2 text-stone-950 outline-none transition focus:border-orange-600"
          >
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="15">15</option>
          </select>
          <button
            type="submit"
            className="rounded-full border border-stone-300 px-3 py-2 font-medium text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
          >
            Update
          </button>
        </form>
      </div>

      <div className="flex gap-3">
        {hasPreviousPage ? (
          <Link
            href={getPageHref({
              page: previousPage,
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
            href={getPageHref({
              page: nextPage,
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
