import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { recipecontext } from "../context/RecipeContext"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useEffect } from "react"

const SingleRecipe = () => {
  const { data, setdata } = useContext(recipecontext)
  const navigate = useNavigate()
  const params = useParams()

  const recipe = data.find(recipe => params.id == recipe.id)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (recipe) {
      reset({
        title: recipe.title,
        chef: recipe.chef,
        image: recipe.image,
        desc: recipe.desc,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category,
      })
    }
  }, [recipe, reset])

  const SubmitHandler = (recipe) => {
    const index = data.findIndex(recipe => params.id == recipe.id)
    const copydata = [...data]
    copydata[index] = { ...copydata[index], ...recipe }
    setdata(copydata)
    toast.success("Recipe Updated!")
  }

  const DeleteHandler = () => {
    const filterdata = data.filter(r => r.id != params.id)
    setdata(filterdata)
    toast.success("Recipe Deleted!")
    navigate("/recipes")
  }

  return (
    recipe ? <div className="w-full flex">
      <div className="left w-1/2 p-2">
        <h1 className="text-5xl font-black">{recipe.title}</h1>
        <img className="h-[20vh]" src={recipe.image} alt="" />
        <h1>{recipe.chef}</h1>
        <p>{recipe.category}</p>
      </div>


      <form onSubmit={handleSubmit(SubmitHandler)} className=" w-1/2 space-y-4">
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
          className="mt-5 block bg-blue-900 text-white px-4 py-2 rounded"
        >
          Update Recipe
        </button>
        <button onClick={DeleteHandler}
          type="submit"
          className="mt-5 block bg-red-900 text-white px-4 py-2 rounded"
        >
          Delete Recipe
        </button>
      </form>
    </div> : "Loading..."
  )
}

export default SingleRecipe