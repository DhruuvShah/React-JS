/* eslint-disable react-refresh/only-export-components */
import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const recipecontext = createContext(null);

const RecipeContext = (props) => {
  const [data, setdata] = useState([
    {
      id: nanoid(),
      title: "Avocado Toast",
      ingredients: [
        "1 slice sourdough or multigrain bread",
        "½ ripe avocado",
        "4–5 cherry tomatoes",
        "Pinch of coarse sea salt",
        "Freshly ground black pepper",
        "1 tsp extra virgin olive oil",
        "Optional: Pinch of red chili flakes or a few microgreens",
      ],
      instructions: [
        "Toast the bread: Place the sourdough slice in a toaster (or on a skillet with a drizzle of olive oil) and toast until golden brown on both sides.",
        "Prepare the avocado: Cut the avocado in half, remove the pit, and scoop the flesh into a small bowl. Mash with a fork until mostly smooth but still slightly chunky.",
        "Season the avocado: Add a pinch of salt and pepper to the mashed avocado. Drizzle in the olive oil and stir gently to combine.",
        "Assemble: Spread the mashed avocado evenly over the toasted bread slice.",
        "Add tomatoes: Halve the cherry tomatoes and arrange them neatly on top of the avocado.",
        "Finish: Sprinkle an additional pinch of sea salt and black pepper over the tomatoes. Garnish with chili flakes or microgreens if desired. Serve immediately.",
      ],
      image:
        "https://videos.openai.com/vg-assets/assets%2Ftask_01jwtfqgakfs8a8m6d6gfz3ndc%2F1748940627_img_1.webp?st=2025-06-07T02%3A31%3A52Z&se=2025-06-13T03%3A31%3A52Z&sks=b&skt=2025-06-07T02%3A31%3A52Z&ske=2025-06-13T03%3A31%3A52Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=8bWY7919OxAnDvb9qhoaM12YLyEWt1IVmLjfXO4PNuM%3D&az=oaivgprodscus",
      chef: "Yotam Ottolenghi",
      category: "Breakfast",
      desc: "A quick and delicious avocado toast recipe, perfect for a healthy breakfast. Made with sourdough bread, mashed avocado, and cherry tomatoes.",
    },
  ]);

  return (
    <recipecontext.Provider value={{ data, setdata }}>
      {props.children}
    </recipecontext.Provider>
  );
};

export default RecipeContext;