import { useForm } from "react-hook-form"
import { nanoid } from "nanoid"
import { useContext } from "react"
import { recipecontext } from "../context/RecipeContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const navigate = useNavigate()
  const { data, setdata } = useContext(recipecontext)
  const { register, handleSubmit, reset } = useForm()

  const SubmitHandler = (formData) => {
    const newRecipe = {
      id: nanoid(),
      image: formData.image,
      title: formData.title,
      chef: formData.chef,
      desc: formData.desc,
      ingredients: formData.ingredients.split("\n"),
      instructions: formData.instructions.split("\n"),
      category: formData.category,
    }

    setdata([...data, newRecipe])
    toast.success("New Recipe Created")
    reset()
    navigate("/recipes")
  }

  return (
    <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-4">
      <input
        className="block border-b outline-none p-2"
        {...register("image", { required: true })}
        type="url"
        placeholder="Enter image URL"
      />

      <input
        className="block border-b outline-none p-2"
        {...register("title", { required: true })}
        type="text"
        placeholder="Recipe Title"
      />

      <input
        className="block border-b outline-none p-2"
        {...register("chef", { required: true })}
        type="text"
        placeholder="Chef Name"
      />

      <textarea
        className="block border-b outline-none p-2"
        {...register("desc", { required: true })}
        placeholder="Short Description"
      />

      <textarea
        className="block border-b outline-none p-2"
        {...register("ingredients", { required: true })}
        placeholder="Ingredients (one per line)"
      />

      <textarea
        className="block border-b outline-none p-2"
        {...register("instructions", { required: true })}
        placeholder="Instructions (one per line)"
      />

      <select
        className="block border-b outline-none p-2"
        {...register("category", { required: true })}
      >
        <option className="text-black" value="">Select category</option>
        <option className="text-black" value="Breakfast">Breakfast</option>
        <option className="text-black" value="Lunch">Lunch</option>
        <option className="text-black" value="Dinner">Dinner</option>
        <option className="text-black" value="Dessert">Dessert</option>
      </select>

      <button
        type="submit"
        className="mt-5 block bg-gray-900 text-white px-4 py-2 rounded"
      >
        Save Recipe
      </button>
    </form>
  )
}

export default Create
