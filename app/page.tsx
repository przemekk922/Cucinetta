import Image from "next/image";
import Link from "next/link";
import { getRecipes } from "@/lib/recipes";

export default async function Home() {
  const { recipes } = await getRecipes({ limit: 1 });
  const featuredRecipe = recipes[0];

  return (
    <main className="min-h-screen">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Cucinetta
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
          Recipe finder
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-stone-950 md:text-6xl">
          Find something good to cook tonight.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
          Cucinetta is a small recipe browser for simple home cooking ideas.
        </p>
      </section>

      {featuredRecipe ? (
        <section>
          <article>
            <Image
              src={featuredRecipe.image}
              alt={featuredRecipe.name}
              width={320}
              height={240}
              priority
            />

            <h2>{featuredRecipe.name}</h2>
            <p>
              {featuredRecipe.cuisine} · {featuredRecipe.difficulty} ·{" "}
              {featuredRecipe.prepTimeMinutes + featuredRecipe.cookTimeMinutes}{" "}
              min
            </p>

            <h3>Ingredients</h3>
            <ul>
              {featuredRecipe.ingredients.slice(0, 6).map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </article>
        </section>
      ) : null}
    </main>
  );
}
