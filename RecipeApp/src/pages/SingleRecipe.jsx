import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { recipecontext } from "../context/RecipeContext"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "react-toastify"
import { ArrowLeft, Edit3, Trash2, CheckCircle, X, Plus, Heart, Timer, Flame, Users, ShoppingCart, ClipboardList, AlertCircle } from "lucide-react"

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"]
const DIFFICULTIES = ["Easy", "Medium", "Hard"]

const categoryBadge = {
  Breakfast: "badge-amber",
  Lunch: "badge-green",
  Dinner: "badge-red",
  Dessert: "badge-amber",
  Snacks: "badge-green",
}

const DIFFICULTY_COLORS = {
  Easy:   { bg: "var(--color-secondary-light)", color: "var(--color-secondary)" },
  Medium: { bg: "var(--color-primary-light)",   color: "var(--color-primary-dark)" },
  Hard:   { bg: "var(--color-accent-light)",    color: "var(--color-accent)" },
}

const toFields = arr =>
  (Array.isArray(arr) ? arr : (arr || "").split("\n").filter(Boolean)).map(v => ({ value: v }))

const SingleRecipe = () => {
  const { data, setdata, favorites, toggleFavorite } = useContext(recipecontext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [editMode, setEditMode] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const recipe = data.find(r => r.id === id)
  const { register, handleSubmit, reset, control } = useForm()
  const { fields: ingFields, append: appendIng, remove: removeIng } = useFieldArray({ control, name: "ingredients" })
  const { fields: insFields, append: appendIns, remove: removeIns } = useFieldArray({ control, name: "instructions" })

  const isFav = favorites.includes(id)

  useEffect(() => {
    if (recipe) {
      reset({
        title: recipe.title,
        chef: recipe.chef,
        image: recipe.image,
        desc: recipe.desc,
        category: recipe.category,
        prepTime: recipe.prepTime || "",
        cookTime: recipe.cookTime || "",
        servings: recipe.servings || "",
        difficulty: recipe.difficulty || "",
        ingredients: toFields(recipe.ingredients),
        instructions: toFields(recipe.instructions),
      })
    }
  }, [recipe, reset])

  const SubmitHandler = formData => {
    const index = data.findIndex(r => r.id === id)
    const copy = [...data]
    copy[index] = {
      ...copy[index],
      ...formData,
      servings: formData.servings ? Number(formData.servings) : null,
      prepTime: formData.prepTime || null,
      cookTime: formData.cookTime || null,
      difficulty: formData.difficulty || null,
      ingredients: formData.ingredients.map(i => i.value).filter(Boolean),
      instructions: formData.instructions.map(i => i.value).filter(Boolean),
    }
    setdata(copy)
    toast.success("Recipe updated!")
    setEditMode(false)
  }

  const DeleteHandler = () => {
    setdata(data.filter(r => r.id !== id))
    toast.success("Recipe deleted!")
    navigate("/recipes")
  }

  if (!recipe) {
    return (
      <div className="section container" style={{ textAlign: "center", paddingTop: "6rem" }}>
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
          <AlertCircle size={26} color="var(--color-primary-dark)" strokeWidth={1.75} />
        </div>
        <h2 className="font-display" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
          Recipe not found
        </h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
          This recipe may have been deleted or the link is invalid.
        </p>
        <Link to="/recipes" className="btn btn-primary">Back to Recipes</Link>
      </div>
    )
  }

  const badgeClass = categoryBadge[recipe.category] || "badge-amber"
  const initial = recipe.chef ? recipe.chef[0].toUpperCase() : "?"
  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : (recipe.ingredients || "").split("\n").filter(Boolean)
  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : (recipe.instructions || "").split("\n").filter(Boolean)
  const diffStyle = DIFFICULTY_COLORS[recipe.difficulty] || null
  const hasMeta = recipe.prepTime || recipe.cookTime || recipe.servings || recipe.difficulty

  const smallRemoveBtn = (onClick, disabled) => ({
    onClick,
    disabled,
    type: "button",
    style: {
      width: "2rem",
      height: "2rem",
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
    },
  })

  const statPill = (children, colorOverride) => ({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      padding: "0.375rem 0.875rem",
      borderRadius: "var(--radius-full)",
      fontSize: "0.8125rem",
      fontWeight: 500,
      ...colorOverride,
    },
    children,
  })

  return (
    <div className="section">
      <div className="container">
        {/* Back */}
        <Link
          to="/recipes"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "var(--color-text-muted)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            marginBottom: "1.75rem",
            transition: "color var(--transition)",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          <ArrowLeft size={16} /> Back to Recipes
        </Link>

        <div
          className={editMode ? "recipe-edit-grid" : ""}
          style={{
            display: "grid",
            gridTemplateColumns: editMode ? "1fr 440px" : "1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* ── Left: recipe view ── */}
          <div>
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                marginBottom: "1.75rem",
                aspectRatio: "16/9",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Meta row: badge + chef */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span className={`badge ${badgeClass}`}>{recipe.category}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <div
                  style={{
                    width: "1.75rem",
                    height: "1.75rem",
                    borderRadius: "50%",
                    background: "var(--color-primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--color-primary-dark)",
                  }}
                >
                  {initial}
                </div>
                <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                  {recipe.chef}
                </span>
              </div>
            </div>

            {/* Stat pills */}
            {hasMeta && (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  marginBottom: "1.25rem",
                }}
              >
                {recipe.prepTime && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      padding: "0.375rem 0.875rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8125rem",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <Timer size={14} color="var(--color-primary)" />
                    <span>
                      <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>Prep</strong>{" "}
                      {recipe.prepTime}
                    </span>
                  </div>
                )}
                {recipe.cookTime && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      padding: "0.375rem 0.875rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8125rem",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <Flame size={14} color="var(--color-accent)" />
                    <span>
                      <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>Cook</strong>{" "}
                      {recipe.cookTime}
                    </span>
                  </div>
                )}
                {recipe.servings && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      padding: "0.375rem 0.875rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8125rem",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <Users size={14} color="var(--color-secondary)" />
                    <span>
                      <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>Serves</strong>{" "}
                      {recipe.servings}
                    </span>
                  </div>
                )}
                {recipe.difficulty && diffStyle && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.375rem 0.875rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      background: diffStyle.bg,
                      color: diffStyle.color,
                    }}
                  >
                    {recipe.difficulty}
                  </div>
                )}
              </div>
            )}

            <h1
              className="font-display"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "0.875rem", lineHeight: 1.2 }}
            >
              {recipe.title}
            </h1>
            <p
              style={{ color: "var(--color-text-muted)", lineHeight: 1.75, marginBottom: "2.5rem", fontSize: "1.0625rem" }}
            >
              {recipe.desc}
            </p>

            <hr className="divider" style={{ marginBottom: "2rem" }} />

            {/* Ingredients */}
            <div style={{ marginBottom: "2.25rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShoppingCart size={18} color="var(--color-primary)" strokeWidth={2} /> Ingredients
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {ingredients.map((ing, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.9375rem", color: "var(--color-text)", lineHeight: 1.6 }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-primary)", marginTop: "0.55rem", flexShrink: 0 }} />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ClipboardList size={18} color="var(--color-primary)" strokeWidth={2} /> Instructions
              </h3>
              <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                {instructions.map((step, i) => (
                  <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span
                      style={{
                        minWidth: "1.875rem",
                        height: "1.875rem",
                        borderRadius: "50%",
                        background: "var(--color-primary)",
                        color: "#fff",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-text)", paddingTop: "0.15rem" }}>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action buttons */}
            {!editMode && (
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button onClick={() => setEditMode(true)} className="btn btn-secondary">
                  <Edit3 size={15} /> Edit Recipe
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(id)}
                  className="btn"
                  style={{
                    background: isFav ? "var(--color-accent-light)" : "var(--color-surface)",
                    color: isFav ? "var(--color-accent)" : "var(--color-text-muted)",
                    border: isFav ? "1.5px solid #FECACA" : "1.5px solid var(--color-border)",
                  }}
                >
                  <Heart size={15} fill={isFav ? "var(--color-accent)" : "none"} />
                  {isFav ? "Saved" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="btn btn-danger"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            )}
          </div>

          {/* ── Right: edit form ── */}
          {editMode && (
            <div
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                padding: "1.75rem",
                boxShadow: "var(--shadow-md)",
                position: "sticky",
                top: "5rem",
                alignSelf: "start",
                maxHeight: "calc(100vh - 7rem)",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <h2 className="font-display" style={{ fontSize: "1.375rem" }}>Edit Recipe</h2>
                <button
                  onClick={() => setEditMode(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", display: "flex", alignItems: "center" }}
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(SubmitHandler)}
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div>
                  <label className="form-label">Image URL</label>
                  <input className="form-input" {...register("image", { required: true })} type="url" placeholder="https://…" />
                </div>
                <div>
                  <label className="form-label">Title</label>
                  <input className="form-input" {...register("title", { required: true })} type="text" />
                </div>
                <div>
                  <label className="form-label">Chef</label>
                  <input className="form-input" {...register("chef", { required: true })} type="text" />
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <textarea className="form-input" {...register("desc", { required: true })} rows={3} style={{ resize: "vertical" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label className="form-label">Category</label>
                    <select className="form-input" {...register("category", { required: true })}>
                      <option value="">Select</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Difficulty</label>
                    <select className="form-input" {...register("difficulty")}>
                      <option value="">Select</option>
                      {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label className="form-label">Prep Time</label>
                    <input className="form-input" {...register("prepTime")} type="text" placeholder="10 min" style={{ padding: "0.5rem 0.75rem", fontSize: "0.875rem" }} />
                  </div>
                  <div>
                    <label className="form-label">Cook Time</label>
                    <input className="form-input" {...register("cookTime")} type="text" placeholder="30 min" style={{ padding: "0.5rem 0.75rem", fontSize: "0.875rem" }} />
                  </div>
                  <div>
                    <label className="form-label">Servings</label>
                    <input className="form-input" {...register("servings")} type="number" min={1} max={20} style={{ padding: "0.5rem 0.75rem", fontSize: "0.875rem" }} />
                  </div>
                </div>

                {/* Dynamic ingredients */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <label className="form-label" style={{ margin: 0 }}>Ingredients</label>
                    <button type="button" onClick={() => appendIng({ value: "" })} className="btn btn-secondary" style={{ padding: "0.2rem 0.625rem", fontSize: "0.7rem", gap: "0.25rem" }}>
                      <Plus size={11} /> Add
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {ingFields.map((field, i) => (
                      <div key={field.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-primary)", flexShrink: 0 }} />
                        <input
                          className="form-input"
                          {...register(`ingredients.${i}.value`)}
                          placeholder={`Ingredient ${i + 1}`}
                          style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.875rem" }}
                        />
                        <button {...smallRemoveBtn(() => removeIng(i), ingFields.length === 1)}>
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic instructions */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <label className="form-label" style={{ margin: 0 }}>Instructions</label>
                    <button type="button" onClick={() => appendIns({ value: "" })} className="btn btn-secondary" style={{ padding: "0.2rem 0.625rem", fontSize: "0.7rem", gap: "0.25rem" }}>
                      <Plus size={11} /> Add
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {insFields.map((field, i) => (
                      <div key={field.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <span style={{ minWidth: "1.375rem", height: "1.375rem", borderRadius: "50%", background: "var(--color-primary)", color: "#fff", fontSize: "0.625rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {i + 1}
                        </span>
                        <input
                          className="form-input"
                          {...register(`instructions.${i}.value`)}
                          placeholder={`Step ${i + 1}`}
                          style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.875rem" }}
                        />
                        <button {...smallRemoveBtn(() => removeIns(i), insFields.length === 1)}>
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.25rem" }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                    <CheckCircle size={15} /> Save Changes
                  </button>
                  <button type="button" onClick={() => setEditMode(false)} className="btn btn-secondary">Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Delete confirmation modal */}
        {showConfirm && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, animation: "fadeIn 0.2s ease" }}
          >
            <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", padding: "2rem", maxWidth: "400px", width: "90%", boxShadow: "var(--shadow-xl)" }}>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "var(--color-accent-light)", margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Trash2 size={22} color="var(--color-accent)" />
                </div>
                <h3 className="font-display" style={{ fontSize: "1.375rem", marginBottom: "0.5rem" }}>Delete Recipe?</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
                  This will permanently remove <strong>{recipe.title}</strong>. This action cannot be undone.
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setShowConfirm(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="button" onClick={DeleteHandler} className="btn btn-danger" style={{ flex: 1, background: "var(--color-accent)", color: "#fff", borderColor: "var(--color-accent)" }}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleRecipe
