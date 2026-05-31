import { Link } from "react-router-dom"
import { Home, BookOpen, UtensilsCrossed } from "lucide-react"

const NotFound = () => (
  <div
    style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}
  >
    <div style={{ textAlign: "center", maxWidth: "480px" }}>
      <div
        style={{
          width: "6rem",
          height: "6rem",
          borderRadius: "50%",
          background: "var(--color-primary-light)",
          border: "2px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 2rem",
        }}
      >
        <UtensilsCrossed size={34} color="var(--color-primary-dark)" strokeWidth={1.5} />
      </div>
      <p
        style={{
          fontSize: "0.8125rem",
          fontWeight: 700,
          color: "var(--color-primary-dark)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        404 — Page not found
      </p>
      <h1
        className="font-display animate-fadeInUp"
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          marginBottom: "1rem",
          lineHeight: 1.15,
        }}
      >
        This page walked out of the kitchen
      </h1>
      <p
        style={{
          color: "var(--color-text-muted)",
          marginBottom: "2.5rem",
          lineHeight: 1.75,
          fontSize: "1.0625rem",
        }}
      >
        The page you're looking for doesn't exist or may have been moved.
        Let's get you back to something delicious.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          className="btn btn-primary"
          style={{ padding: "0.75rem 2rem" }}
        >
          <Home size={16} /> Go Home
        </Link>
        <Link
          to="/recipes"
          className="btn btn-secondary"
          style={{ padding: "0.75rem 2rem" }}
        >
          <BookOpen size={16} /> Browse Recipes
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound
