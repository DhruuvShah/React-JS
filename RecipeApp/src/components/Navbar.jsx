import { NavLink, Link } from "react-router-dom"
import { UtensilsCrossed, Heart, Menu, X, Plus } from "lucide-react"
import { useState, useEffect, useContext } from "react"
import { recipecontext } from "../context/RecipeContext"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/recipes", label: "Recipes" },
  { to: "/about", label: "About" },
]

const Navbar = () => {
  const { favorites } = useContext(recipecontext)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const linkStyle = ({ isActive }) => ({
    fontSize: "0.875rem",
    fontWeight: 500,
    textDecoration: "none",
    color: isActive ? "var(--color-primary-dark)" : "var(--color-text-muted)",
    borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
    paddingBottom: "2px",
    transition: "color var(--transition), border-color var(--transition)",
    letterSpacing: "0.01em",
  })

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(250,250,247,0.92)" : "var(--color-bg)",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: "1px solid var(--color-border)",
        transition: "background var(--transition)",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", height: "4rem", gap: "1rem" }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "2rem",
              height: "2rem",
              background: "var(--color-primary)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <UtensilsCrossed size={14} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            className="font-display nav-brand-label"
            style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.01em" }}
          >
            RecipeVault
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="nav-links-desktop">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"} style={linkStyle}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0, marginLeft: "auto" }}>
          {/* Saved heart */}
          <Link
            to="/recipes?filter=saved"
            title={`${favorites.length} saved recipe${favorites.length !== 1 ? "s" : ""}`}
            style={{
              position: "relative",
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: favorites.length > 0 ? "var(--color-accent)" : "var(--color-text-muted)",
              textDecoration: "none",
              transition: "background var(--transition)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--color-accent-light)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Heart
              size={18}
              fill={favorites.length > 0 ? "var(--color-accent)" : "none"}
              strokeWidth={favorites.length > 0 ? 0 : 2}
            />
            {favorites.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-1px",
                  right: "-1px",
                  minWidth: "16px",
                  height: "16px",
                  borderRadius: "9999px",
                  background: "var(--color-accent)",
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 3px",
                  lineHeight: 1,
                  boxShadow: "0 0 0 2px var(--color-bg)",
                }}
              >
                {favorites.length > 9 ? "9+" : favorites.length}
              </span>
            )}
          </Link>

          {/* Desktop CTA */}
          <Link
            to="/create-recipe"
            className="btn btn-primary nav-cta-desktop"
            style={{ fontSize: "0.8125rem", padding: "0.5rem 1.125rem", gap: "0.35rem" }}
          >
            <Plus size={14} strokeWidth={2.5} /> Add Recipe
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav className="mobile-nav">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                fontSize: "1rem",
                fontWeight: 500,
                textDecoration: "none",
                color: isActive ? "var(--color-primary-dark)" : "var(--color-text)",
                padding: "0.875rem 0",
                borderBottom: "1px solid var(--color-border)",
                display: "block",
                transition: "color var(--transition)",
              })}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/create-recipe"
            className="btn btn-primary"
            onClick={() => setMobileOpen(false)}
            style={{ marginTop: "1rem", justifyContent: "center", gap: "0.375rem" }}
          >
            <Plus size={15} /> Add Recipe
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Navbar
