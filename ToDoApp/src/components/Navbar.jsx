import { useState, useEffect } from "react"
import { ScanLine } from "lucide-react"

const Navbar = ({ activeCount, allDone }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.9)" : "#FFFFFF",
        backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        borderBottom: "1px solid var(--color-border)",
        transition: "background var(--transition), box-shadow var(--transition)",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,.06)" : "none",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", height: "3.75rem", gap: "1rem" }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
          <div
            style={{
              width: "1.875rem",
              height: "1.875rem",
              background: "var(--color-primary)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(99,102,241,.3)",
            }}
          >
            <ScanLine size={13} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            className="font-display nav-brand-label"
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--color-text)",
              letterSpacing: "-0.025em",
            }}
          >
            Taskly
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Status */}
        {allDone ? (
          <span className="badge badge-green" style={{ fontSize: "0.75rem" }}>
            All done
          </span>
        ) : activeCount > 0 ? (
          <span className="badge badge-indigo" style={{ fontSize: "0.75rem" }}>
            {activeCount} left
          </span>
        ) : null}
      </div>
    </header>
  )
}

export default Navbar
