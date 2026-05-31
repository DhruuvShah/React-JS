import { useContext, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { recipecontext } from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"
import { Search, BookOpen, Plus, Heart } from "lucide-react"

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Saved"]
const DIFFICULTIES = ["All Levels", "Easy", "Medium", "Hard"]

const DIFF_ACTIVE_STYLES = {
  Easy:       { bg: "var(--color-secondary-light)", color: "var(--color-secondary)",    border: "var(--color-secondary)" },
  Medium:     { bg: "var(--color-primary-light)",   color: "var(--color-primary-dark)", border: "var(--color-primary)" },
  Hard:       { bg: "var(--color-accent-light)",    color: "var(--color-accent)",       border: "var(--color-accent)" },
  "All Levels": { bg: "var(--color-text)",          color: "#fff",                      border: "var(--color-text)" },
}

const Recipes = () => {
  const { data, favorites } = useContext(recipecontext)
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(() =>
    searchParams.get("filter") === "saved" ? "Saved" : "All"
  )
  const [activeDifficulty, setActiveDifficulty] = useState("All Levels")

  const filtered = data.filter(r => {
    const q = search.toLowerCase()
    const matchSearch =
      r.title.toLowerCase().includes(q) ||
      r.chef.toLowerCase().includes(q)
    const matchCat =
      activeCategory === "All"
        ? true
        : activeCategory === "Saved"
        ? favorites.includes(r.id)
        : r.category === activeCategory
    const matchDiff =
      activeDifficulty === "All Levels" ? true : r.difficulty === activeDifficulty
    return matchSearch && matchCat && matchDiff
  })

  const isFiltered = search || activeCategory !== "All" || activeDifficulty !== "All Levels"

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1
              className="font-display"
              style={{ fontSize: "2.25rem", marginBottom: "0.375rem" }}
            >
              All Recipes
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
              {data.length} recipe{data.length !== 1 ? "s" : ""} in your vault
            </p>
          </div>
          <Link
            to="/create-recipe"
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
          >
            <Plus size={15} /> New Recipe
          </Link>
        </div>

        {/* Search */}
        <div
          style={{
            position: "relative",
            maxWidth: "420px",
            marginBottom: "1.25rem",
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-light)",
              pointerEvents: "none",
            }}
          />
          <input
            className="form-input"
            style={{ paddingLeft: "2.75rem" }}
            placeholder="Search by title or chef…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Category filter */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "0.75rem",
          }}
        >
          {CATEGORIES.map(cat => {
            const isSaved = cat === "Saved"
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.375rem 1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  border: isActive
                    ? isSaved
                      ? "1.5px solid var(--color-accent)"
                      : "1.5px solid var(--color-primary)"
                    : "1.5px solid var(--color-border)",
                  background: isActive
                    ? isSaved
                      ? "var(--color-accent)"
                      : "var(--color-primary)"
                    : "var(--color-surface)",
                  color: isActive ? "#fff" : isSaved ? "var(--color-accent)" : "var(--color-text-muted)",
                  transition: "all var(--transition)",
                }}
              >
                {isSaved && <Heart size={12} fill={isActive ? "#fff" : "none"} strokeWidth={2.5} />}
                {cat}
              </button>
            )
          })}
        </div>

        {/* Difficulty filter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--color-text-light)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginRight: "0.125rem",
            }}
          >
            Level
          </span>
          {DIFFICULTIES.map(diff => {
            const isActive = activeDifficulty === diff
            const style = DIFF_ACTIVE_STYLES[diff]
            return (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                style={{
                  padding: "0.3rem 0.875rem",
                  fontSize: "0.775rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  borderRadius: "var(--radius-full)",
                  border: isActive
                    ? `1.5px solid ${style.border}`
                    : "1.5px solid var(--color-border)",
                  background: isActive ? style.bg : "var(--color-surface)",
                  color: isActive ? style.color : "var(--color-text-muted)",
                  transition: "all var(--transition)",
                }}
              >
                {diff}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {isFiltered && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-muted)",
              marginBottom: "1.25rem",
            }}
          >
            Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {search ? ` for "${search}"` : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            {activeDifficulty !== "All Levels" ? ` · ${activeDifficulty}` : ""}
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              background: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <BookOpen
              size={48}
              style={{
                color: "var(--color-text-light)",
                margin: "0 auto 1rem",
                display: "block",
              }}
            />
            <h3
              className="font-display"
              style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}
            >
              No recipes found
            </h3>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
              {search
                ? `No results for "${search}" — try a different term.`
                : activeCategory === "Saved"
                ? "No saved recipes yet — click the heart on any card to save it."
                : "Start by adding your first recipe!"}
            </p>
            {!search && activeCategory !== "Saved" && (
              <Link to="/create-recipe" className="btn btn-primary">
                Add a Recipe
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Recipes
