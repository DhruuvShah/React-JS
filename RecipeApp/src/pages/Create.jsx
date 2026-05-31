import { useForm, useFieldArray } from "react-hook-form"
import { nanoid } from "nanoid"
import { useContext, useState } from "react"
import { recipecontext } from "../context/RecipeContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { ImageIcon, Plus, X } from "lucide-react"

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"]
const DIFFICULTIES = ["Easy", "Medium", "Hard"]

const Create = () => {
  const navigate = useNavigate()
  const { data, setdata } = useContext(recipecontext)
  const { register, handleSubmit, reset, watch, control } = useForm({
    defaultValues: {
      ingredients: [{ value: "" }],
      instructions: [{ value: "" }],
    },
  })
  const { fields: ingFields, append: appendIng, remove: removeIng } = useFieldArray({ control, name: "ingredients" })
  const { fields: insFields, append: appendIns, remove: removeIns } = useFieldArray({ control, name: "instructions" })
  const [submitting, setSubmitting] = useState(false)
  const [imgError, setImgError] = useState(false)

  const imageUrl = watch("image")

  const SubmitHandler = formData => {
    setSubmitting(true)
    const newRecipe = {
      id: nanoid(),
      image: formData.image,
      title: formData.title,
      chef: formData.chef,
      desc: formData.desc,
      category: formData.category,
      prepTime: formData.prepTime || null,
      cookTime: formData.cookTime || null,
      servings: formData.servings ? Number(formData.servings) : null,
      difficulty: formData.difficulty || null,
      ingredients: formData.ingredients.map(i => i.value).filter(Boolean),
      instructions: formData.instructions.map(i => i.value).filter(Boolean),
    }
    setdata([...data, newRecipe])
    toast.success("Recipe created!")
    reset()
    setImgError(false)
    setSubmitting(false)
    navigate("/recipes")
  }

  const removeBtn = (onClick, disabled) => ({
    onClick,
    disabled,
    type: "button",
    style: {
      width: "2.25rem",
      height: "2.25rem",
      flexShrink: 0,
      background: "none",
      border: "1.5px solid var(--color-border)",
      borderRadius: "var(--radius-sm)",
      cursor: disabled ? "not-allowed" : "pointer",
      color: disabled ? "var(--color-text-light)" : "var(--color-accent)",
      opacity: disabled ? 0.4 : 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all var(--transition)",
    },
  })

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: "1080px" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 className="font-display" style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>
            Create a Recipe
          </h1>
          <p style={{ color: "var(--color-text-muted)" }}>
            Share your culinary masterpiece with the world.
          </p>
        </div>

        <div
          className="create-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit(SubmitHandler)}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div>
              <label className="form-label">Image URL</label>
              <input
                className="form-input"
                {...register("image", { required: true })}
                type="url"
                placeholder="https://example.com/dish.jpg"
                onChange={() => setImgError(false)}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="form-label">Recipe Title</label>
                <input
                  className="form-input"
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="e.g. Pasta Carbonara"
                />
              </div>
              <div>
                <label className="form-label">Chef Name</label>
                <input
                  className="form-input"
                  {...register("chef", { required: true })}
                  type="text"
                  placeholder="e.g. Gordon Ramsay"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="form-label">Category</label>
                <select className="form-input" {...register("category", { required: true })}>
                  <option value="">Select category…</option>
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Difficulty</label>
                <select className="form-input" {...register("difficulty")}>
                  <option value="">Select difficulty…</option>
                  {DIFFICULTIES.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time + servings row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="form-label">Prep Time</label>
                <input
                  className="form-input"
                  {...register("prepTime")}
                  type="text"
                  placeholder="e.g. 10 min"
                />
              </div>
              <div>
                <label className="form-label">Cook Time</label>
                <input
                  className="form-input"
                  {...register("cookTime")}
                  type="text"
                  placeholder="e.g. 30 min"
                />
              </div>
              <div>
                <label className="form-label">Servings</label>
                <input
                  className="form-input"
                  {...register("servings")}
                  type="number"
                  min={1}
                  max={20}
                  placeholder="4"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                {...register("desc", { required: true })}
                rows={3}
                placeholder="A short, enticing description of the dish…"
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Dynamic Ingredients */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <label className="form-label" style={{ margin: 0 }}>Ingredients</label>
                <button
                  type="button"
                  onClick={() => appendIng({ value: "" })}
                  className="btn btn-secondary"
                  style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", gap: "0.3rem" }}
                >
                  <Plus size={12} /> Add
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {ingFields.map((field, i) => (
                  <div key={field.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--color-primary)",
                        flexShrink: 0,
                      }}
                    />
                    <input
                      className="form-input"
                      {...register(`ingredients.${i}.value`)}
                      placeholder={`Ingredient ${i + 1}`}
                      style={{ flex: 1 }}
                    />
                    <button {...removeBtn(() => removeIng(i), ingFields.length === 1)}>
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Instructions */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <label className="form-label" style={{ margin: 0 }}>Instructions</label>
                <button
                  type="button"
                  onClick={() => appendIns({ value: "" })}
                  className="btn btn-secondary"
                  style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", gap: "0.3rem" }}
                >
                  <Plus size={12} /> Add
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {insFields.map((field, i) => (
                  <div key={field.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span
                      style={{
                        minWidth: "1.625rem",
                        height: "1.625rem",
                        borderRadius: "50%",
                        background: "var(--color-primary)",
                        color: "#fff",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <input
                      className="form-input"
                      {...register(`instructions.${i}.value`)}
                      placeholder={`Step ${i + 1}`}
                      style={{ flex: 1 }}
                    />
                    <button {...removeBtn(() => removeIns(i), insFields.length === 1)}>
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{
                alignSelf: "flex-start",
                padding: "0.75rem 2.5rem",
                fontSize: "0.9375rem",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Saving…" : "Save Recipe"}
            </button>
          </form>

          {/* Preview panel */}
          <div style={{ position: "sticky", top: "5rem" }}>
            <p className="form-label" style={{ marginBottom: "0.75rem" }}>Image Preview</p>
            <div
              style={{
                aspectRatio: "16/9",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                background: "#F3F4F6",
                border: "1.5px dashed var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              {imageUrl && !imgError ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div style={{ textAlign: "center", color: "var(--color-text-light)", padding: "1rem" }}>
                  <ImageIcon size={32} style={{ margin: "0 auto 0.5rem", display: "block" }} />
                  <p style={{ fontSize: "0.875rem" }}>
                    {imgError ? "Could not load image" : "Paste an image URL to preview"}
                  </p>
                </div>
              )}
            </div>

            <div
              style={{
                background: "var(--color-primary-light)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                border: "1px solid #FDE68A",
              }}
            >
              <h4
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  marginBottom: "0.625rem",
                  color: "var(--color-primary-dark)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Tips for a great recipe
              </h4>
              <ul
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-primary-dark)",
                  lineHeight: 1.75,
                  paddingLeft: "1rem",
                }}
              >
                <li>Use a high-quality food photo</li>
                <li>Be specific with ingredient quantities</li>
                <li>Write steps in the order they happen</li>
                <li>Keep the description warm and inviting</li>
                <li>Add prep/cook time to help readers plan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
