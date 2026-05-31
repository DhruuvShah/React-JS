import { Link } from "react-router-dom"
import { ArrowRight, Heart, Clock, Users } from "lucide-react"
import { useContext } from "react"
import { recipecontext } from "../context/RecipeContext"

const categoryBadge = {
  Breakfast: "badge-amber",
  Lunch: "badge-green",
  Dinner: "badge-red",
  Dessert: "badge-amber",
  Snacks: "badge-green",
}

const difficultyColor = {
  Easy:   "var(--color-secondary)",
  Medium: "var(--color-primary-dark)",
  Hard:   "var(--color-accent)",
}

const RecipeCard = ({ recipe }) => {
  const { id, image, title, desc, chef, category, cookTime, servings, difficulty } = recipe
  const { favorites, toggleFavorite } = useContext(recipecontext)
  const isFav = favorites.includes(id)
  const badgeClass = categoryBadge[category] || "badge-amber"
  const initial = chef ? chef[0].toUpperCase() : "?"
  const hasMeta = cookTime || servings || difficulty

  return (
    <Link
      to={`/recipes/details/${id}`}
      className="card animate-fadeInUp"
      style={{ display: "block", textDecoration: "none", overflow: "hidden" }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 400ms var(--ease-out)",
            display: "block",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />
        <span
          className={`badge ${badgeClass}`}
          style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}
        >
          {category}
        </span>
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(id); }}
          title={isFav ? "Remove from saved" : "Save recipe"}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            background: isFav ? "var(--color-accent)" : "rgba(255,255,255,0.88)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "all var(--transition)",
          }}
        >
          <Heart
            size={14}
            fill={isFav ? "#fff" : "none"}
            color={isFav ? "#fff" : "var(--color-accent)"}
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "1rem 1.125rem 1.25rem" }}>
        <h3
          className="font-display"
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            marginBottom: "0.375rem",
            color: "var(--color-text)",
          }}
        >
          {title}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.625rem",
          }}
        >
          <div
            style={{
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "50%",
              background: "var(--color-primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.6875rem",
              fontWeight: 700,
              color: "var(--color-primary-dark)",
              flexShrink: 0,
            }}
          >
            {initial}
          </div>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
            {chef}
          </span>
        </div>

        <p
          className="line-clamp-2"
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.6,
            marginBottom: hasMeta ? "0.75rem" : "0.875rem",
          }}
        >
          {desc}
        </p>

        {/* Meta row */}
        {hasMeta && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--color-border)",
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              marginBottom: "0.875rem",
            }}
          >
            {cookTime && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Clock size={12} style={{ flexShrink: 0 }} />
                {cookTime}
              </span>
            )}
            {servings && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Users size={12} style={{ flexShrink: 0 }} />
                {servings} {servings === 1 ? "serving" : "servings"}
              </span>
            )}
            {difficulty && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: difficultyColor[difficulty] || "var(--color-text-muted)",
                }}
              >
                {difficulty}
              </span>
            )}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            color: "var(--color-primary-dark)",
            fontSize: "0.8125rem",
            fontWeight: 600,
          }}
        >
          View Recipe <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
