import { useContext, Fragment } from "react"
import { Link } from "react-router-dom"
import { recipecontext } from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"
import {
  BookOpen, ChefHat, Heart, Tag, ArrowRight,
  Coffee, Leaf, UtensilsCrossed, Cookie, Apple,
} from "lucide-react"

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"]

const CATEGORY_ICONS = {
  Breakfast: Coffee,
  Lunch:     Leaf,
  Dinner:    UtensilsCrossed,
  Dessert:   Cookie,
  Snacks:    Apple,
}

const Home = () => {
  const { data, favorites } = useContext(recipecontext)
  const featured = data.slice(0, 3)
  const uniqueCategories = [...new Set(data.map(r => r.category))].length
  const uniqueChefs     = [...new Set(data.map(r => r.chef))].length

  const stats = [
    { icon: BookOpen,  label: "Recipes",    value: data.length },
    { icon: Tag,       label: "Categories", value: uniqueCategories || CATEGORIES.length },
    { icon: ChefHat,   label: "Chefs",      value: uniqueChefs || 0 },
    { icon: Heart,     label: "Saved",      value: favorites.length },
  ]

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(150deg, #FFFBEB 0%, #FEF9EE 50%, #FEF3C7 100%)",
          padding: "6rem 0 5rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <span
            className="badge badge-amber animate-fadeIn"
            style={{ marginBottom: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            Your Personal Recipe Book
          </span>
          <h1
            className="font-display animate-fadeInUp"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              fontWeight: 700,
              marginBottom: "1.375rem",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Cook Something{" "}
            <span style={{ color: "var(--color-primary-dark)", fontStyle: "italic" }}>
              Extraordinary
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
            }}
          >
            Discover, create, and save your favourite recipes in one beautiful place.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.875rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/recipes"
              className="btn btn-primary"
              style={{ padding: "0.8125rem 2.125rem", fontSize: "0.9375rem" }}
            >
              Browse Recipes
            </Link>
            <Link
              to="/create-recipe"
              className="btn btn-secondary"
              style={{ padding: "0.8125rem 2.125rem", fontSize: "0.9375rem" }}
            >
              Add Your Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "1.625rem 0",
        }}
      >
        <div
          className="container stats-bar"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {stats.map(({ icon: Icon, label, value }, idx) => (
            <Fragment key={label}>
              <div
                className="stat-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0 2.75rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} color="var(--color-primary-dark)" strokeWidth={2.25} />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: "var(--color-text)",
                      fontSize: "1.375rem",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      marginBottom: "0.2rem",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--color-text-muted)",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              </div>
              {idx < stats.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "2.75rem",
                    background: "var(--color-border)",
                    flexShrink: 0,
                  }}
                />
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Browse by Category
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1rem" }}>
              Find exactly what you are craving.
            </p>
          </div>

          <div className="cat-grid">
            {CATEGORIES.map(cat => {
              const Icon = CATEGORY_ICONS[cat]
              return (
                <Link
                  key={cat}
                  to="/recipes"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.875rem",
                    padding: "2.25rem 1rem",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-surface)",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 2px 8px rgba(0,0,0,.04)",
                    textDecoration: "none",
                    transition: "all var(--transition)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--color-primary)"
                    e.currentTarget.style.background = "var(--color-primary-light)"
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)"
                    e.currentTarget.style.background = "var(--color-surface)"
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.04)"
                  }}
                >
                  <div
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "var(--radius-md)",
                      background: "var(--color-primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={26} color="var(--color-primary-dark)" strokeWidth={1.75} />
                  </div>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {cat}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Featured recipes ─────────────────────────────────── */}
      {featured.length > 0 && (
        <section style={{ paddingBottom: "5rem" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "1.75rem",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div>
                <h2
                  className="font-display"
                  style={{ fontSize: "1.75rem", letterSpacing: "-0.02em" }}
                >
                  Featured Recipes
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem", marginTop: "0.25rem" }}>
                  A curated selection to inspire your next cook.
                </p>
              </div>
              <Link
                to="/recipes"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-primary-dark)",
                  textDecoration: "none",
                  transition: "gap var(--transition)",
                }}
                onMouseEnter={e => (e.currentTarget.style.gap = "0.5rem")}
                onMouseLeave={e => (e.currentTarget.style.gap = "0.25rem")}
              >
                View all <ArrowRight size={15} />
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {featured.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Empty state ───────────────────────────────────────── */}
      {data.length === 0 && (
        <section style={{ paddingBottom: "5rem" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1.5px dashed var(--color-border)",
                padding: "4rem 2rem",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",
                  background: "var(--color-primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <ChefHat size={28} color="var(--color-primary-dark)" strokeWidth={1.75} />
              </div>
              <h3
                className="font-display"
                style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}
              >
                No recipes yet
              </h3>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  marginBottom: "1.75rem",
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                }}
              >
                Start building your recipe vault by adding your first dish.
              </p>
              <Link
                to="/create-recipe"
                className="btn btn-primary"
                style={{ padding: "0.75rem 2rem" }}
              >
                Add First Recipe
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
