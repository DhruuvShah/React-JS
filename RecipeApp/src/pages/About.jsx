import { Link } from "react-router-dom"
import { Heart, BookOpen, Search, Edit3, Users, Flame, UtensilsCrossed, Plus } from "lucide-react"

const pillars = [
  {
    icon: Users,
    title: "Gather",
    desc: "Food speaks every language. When we sit around the same table, something shifts — guards come down, conversations deepen, and the meal becomes the excuse. The connection is the point.",
  },
  {
    icon: Heart,
    title: "Nourish",
    desc: "To cook for someone is to say: I thought about you. I gave you my time. A bowl made with care carries more warmth than any gift could. That is love in its most honest form.",
  },
  {
    icon: BookOpen,
    title: "Remember",
    desc: "Every recipe is an heirloom. A grandmother's curry, a childhood breakfast, a first dinner cooked for someone you love — food holds time still, and keeps the voices of the people who mattered.",
  },
]

const features = [
  {
    icon: UtensilsCrossed,
    title: "Create Recipes",
    desc: "Build your personal collection with a beautiful image, measured ingredients, and clear step-by-step instructions.",
  },
  {
    icon: Search,
    title: "Search & Filter",
    desc: "Find the perfect dish in seconds by name, chef, category, or difficulty level.",
  },
  {
    icon: Edit3,
    title: "Edit Freely",
    desc: "Update any recipe at any time with a clean, distraction-free inline editor — no page reload needed.",
  },
  {
    icon: Heart,
    title: "Save Favourites",
    desc: "Bookmark the recipes closest to your heart and return to them whenever inspiration strikes.",
  },
]

const About = () => {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(150deg, #FFFBEB 0%, #FEF3C7 55%, #FFF7ED 100%)",
          padding: "6rem 0 5rem",
          borderBottom: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "640px" }}>
          <span
            className="badge badge-amber animate-fadeIn"
            style={{ marginBottom: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            A love letter to food
          </span>
          <h1
            className="font-display animate-fadeInUp"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Food is love,{" "}
            <span style={{ color: "var(--color-primary-dark)", fontStyle: "italic" }}>
              made visible
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.8,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Every great recipe begins with a feeling — the warmth of a grandmother's
            kitchen, the triumph of your first soufflé, the comfort of a dish shared
            with people you cherish. RecipeVault exists to hold those moments.
          </p>
        </div>
      </section>

      {/* ── Philosophy pillars ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--color-text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.625rem",
              }}
            >
              What we believe
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}
            >
              Three truths about food
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
              maxWidth: "960px",
              margin: "0 auto",
            }}
          >
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "var(--color-surface)",
                  borderRadius: "var(--radius-xl)",
                  boxShadow: "0 2px 16px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.04)",
                  padding: "2.5rem 2rem",
                  transition: "box-shadow var(--transition), transform var(--transition)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.10), 0 4px 8px rgba(0,0,0,.05)"
                  e.currentTarget.style.transform = "translateY(-4px)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.04)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <div
                  style={{
                    width: "3.75rem",
                    height: "3.75rem",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Icon size={22} color="var(--color-primary-dark)" strokeWidth={1.75} />
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.375rem",
                    marginBottom: "0.875rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.75,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull quote ───────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-primary-light)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "680px" }}>
          <Flame
            size={22}
            color="var(--color-primary-dark)"
            strokeWidth={1.75}
            style={{ margin: "0 auto 1.5rem", display: "block" }}
          />
          <blockquote
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.35,
              color: "var(--color-text)",
              fontStyle: "italic",
              letterSpacing: "-0.01em",
              marginBottom: "1.25rem",
            }}
          >
            "The act of cooking is the oldest act of love in the world."
          </blockquote>
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--color-primary-dark)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            RecipeVault
          </p>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--color-text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.625rem",
              }}
            >
              Everything you need
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}
            >
              Built around your kitchen
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card"
                style={{ padding: "2rem 1.75rem" }}
              >
                <div
                  style={{
                    width: "3.25rem",
                    height: "3.25rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Icon size={20} color="var(--color-primary-dark)" strokeWidth={1.75} />
                </div>
                <h4
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    color: "var(--color-text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-text)",
          padding: "5rem 0",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "560px" }}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "#fff",
              marginBottom: "0.875rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Begin your collection
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              marginBottom: "2rem",
              fontSize: "1.0625rem",
              lineHeight: 1.7,
            }}
          >
            The best time to save a recipe is before you forget it.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/recipes"
              className="btn"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                padding: "0.8125rem 2rem",
                fontSize: "0.9375rem",
              }}
            >
              Browse Recipes
            </Link>
            <Link
              to="/create-recipe"
              className="btn"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.25)",
                padding: "0.8125rem 2rem",
                fontSize: "0.9375rem",
              }}
            >
              <Plus size={16} /> Add a Recipe
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
