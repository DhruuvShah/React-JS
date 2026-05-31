import { Check, Trash2, Inbox } from "lucide-react"

const FILTERS = [
  { key: "all",       label: "All" },
  { key: "active",    label: "Active" },
  { key: "completed", label: "Done" },
]

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <div className={`todo-item${todo.isCompleted ? " completed" : ""}`}>
    {/* Checkbox */}
    <button
      onClick={() => onToggle(todo.id)}
      aria-label={todo.isCompleted ? "Mark incomplete" : "Mark complete"}
      style={{
        width: "1.25rem",
        height: "1.25rem",
        borderRadius: todo.isCompleted ? "50%" : "5px",
        border: todo.isCompleted ? "none" : "1.75px solid var(--color-border)",
        background: todo.isCompleted ? "var(--color-secondary)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.2s var(--ease-out)",
      }}
      onMouseEnter={e => {
        if (!todo.isCompleted) {
          e.currentTarget.style.borderColor = "var(--color-primary)"
          e.currentTarget.style.background = "var(--color-primary-light)"
        }
      }}
      onMouseLeave={e => {
        if (!todo.isCompleted) {
          e.currentTarget.style.borderColor = "var(--color-border)"
          e.currentTarget.style.background = "transparent"
        }
      }}
    >
      {todo.isCompleted && <Check size={9} color="#fff" strokeWidth={3.5} />}
    </button>

    {/* Title */}
    <span
      style={{
        flex: 1,
        fontSize: "0.9375rem",
        fontWeight: 450,
        color: todo.isCompleted ? "var(--color-text-light)" : "var(--color-text)",
        textDecoration: todo.isCompleted ? "line-through" : "none",
        letterSpacing: "-0.005em",
        transition: "color var(--transition)",
      }}
    >
      {todo.title}
    </span>

    {/* Delete */}
    <button
      onClick={() => onDelete(todo.id)}
      aria-label="Delete task"
      style={{
        width: "1.875rem",
        height: "1.875rem",
        borderRadius: "var(--radius-sm)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-text-light)",
        flexShrink: 0,
        opacity: 0,
        transition: "all var(--transition)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "var(--color-accent-light)"
        e.currentTarget.style.color = "var(--color-accent)"
        e.currentTarget.style.opacity = "1"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent"
        e.currentTarget.style.color = "var(--color-text-light)"
        e.currentTarget.style.opacity = "0"
      }}
      onFocus={e => { e.currentTarget.style.opacity = "1" }}
      onBlur={e => { e.currentTarget.style.opacity = "0" }}
      className="todo-delete"
    >
      <Trash2 size={13} />
    </button>
  </div>
)

const Read = ({ todos, filter, setFilter, onToggle, onDelete, onClearCompleted, completedCount }) => (
  <div>
    {/* Filter tabs */}
    <div className="filter-tabs">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`filter-tab${filter === key ? " active" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>

    {/* List */}
    {todos.length === 0 ? (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 2rem",
        }}
      >
        <div
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}
        >
          <Inbox size={18} color="var(--color-primary)" strokeWidth={1.75} />
        </div>
        <p
          style={{
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "0.375rem",
            fontSize: "0.9375rem",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {filter === "completed" ? "Nothing completed yet"
            : filter === "active" ? "No active tasks"
            : "Nothing here yet"}
        </p>
        <p style={{ fontSize: "0.8125rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
          {filter === "all"
            ? "Type a task above and press Enter."
            : "Switch filters to see more."}
        </p>
      </div>
    ) : (
      <div
        style={{ position: "relative" }}
        onMouseEnter={e => {
          e.currentTarget.querySelectorAll(".todo-delete").forEach(btn => {
            btn.style.opacity = "0"
          })
        }}
      >
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>
    )}

    {/* Clear completed */}
    {completedCount > 0 && (
      <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
        <button
          onClick={onClearCompleted}
          className="btn btn-secondary"
          style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
        >
          Clear {completedCount} done
        </button>
      </div>
    )}
  </div>
)

export default Read
