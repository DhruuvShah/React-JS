import { useState } from "react"
import { ArrowRight } from "lucide-react"

const Create = ({ onAdd }) => {
  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.625rem",
        marginBottom: "1.75rem",
      }}
    >
      <input
        className="form-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a task…"
        style={{ flex: 1 }}
        autoFocus
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!title.trim()}
        style={{ padding: "0.8125rem 1.375rem", flexShrink: 0 }}
      >
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>
    </form>
  )
}

export default Create
