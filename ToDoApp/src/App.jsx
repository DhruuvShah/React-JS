import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Navbar from "./components/Navbar"
import Create from "./components/Create"
import Read from "./components/Read"

const App = () => {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("taskly-todos")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("taskly-todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (title) => {
    setTodos(prev => [...prev, { id: nanoid(), title, isCompleted: false }])
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.isCompleted))
  }

  const activeCount    = todos.filter(t => !t.isCompleted).length
  const completedCount = todos.filter(t => t.isCompleted).length
  const completionPct  = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100)
  const allDone        = todos.length > 0 && activeCount === 0

  const filtered = todos.filter(t => {
    if (filter === "active")    return !t.isCompleted
    if (filter === "completed") return t.isCompleted
    return true
  })

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <Navbar activeCount={activeCount} allDone={allDone} />

      {/* ── Hero ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 55%, #2D2666 100%)",
          padding: "5.5rem 0 4.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        <div className="container animate-fadeIn" style={{ maxWidth: "620px", position: "relative" }}>
          <span
            className="badge badge-muted animate-fadeIn"
            style={{
              marginBottom: "1.75rem",
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            Productivity
          </span>
          <h1
            className="font-display animate-fadeInUp"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "1.25rem",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Clear your mind,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #818CF8, #A5B4FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              clear your list.
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              maxWidth: "420px",
              margin: "0 auto",
            }}
          >
            Capture everything. Stay focused on what matters. Check it off and move on.
          </p>
        </div>
      </section>

      {/* ── Progress ── */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "1.5rem 0",
        }}
      >
        <div className="container" style={{ maxWidth: "680px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--color-text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Progress
            </span>
            <span
              className="font-display"
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: allDone ? "var(--color-secondary)" : "var(--color-primary)",
                transition: "color 0.3s ease",
              }}
            >
              {completionPct}%
            </span>
          </div>

          <div className="progress-track" style={{ marginBottom: "0.875rem" }}>
            <div
              className={`progress-fill${allDone ? " complete" : ""}`}
              style={{ width: `${completionPct}%` }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.25rem",
              fontSize: "0.8125rem",
              color: "var(--color-text-muted)",
              fontWeight: 400,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 600, color: "var(--color-text)" }}>{todos.length}</span>
            <span>total</span>
            <span style={{ margin: "0 0.5rem", color: "var(--color-border)" }}>·</span>
            <span style={{ fontWeight: 600, color: "var(--color-text)" }}>{activeCount}</span>
            <span>remaining</span>
            <span style={{ margin: "0 0.5rem", color: "var(--color-border)" }}>·</span>
            <span
              style={{
                fontWeight: 600,
                color: completedCount > 0 ? "var(--color-secondary)" : "var(--color-text)",
                transition: "color 0.3s ease",
              }}
            >
              {completedCount}
            </span>
            <span>done</span>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: "680px" }}>
          <Create onAdd={addTodo} />
          <Read
            todos={filtered}
            filter={filter}
            setFilter={setFilter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onClearCompleted={clearCompleted}
            completedCount={completedCount}
          />
        </div>
      </section>
    </div>
  )
}

export default App
