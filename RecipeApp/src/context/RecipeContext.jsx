/* eslint-disable react-refresh/only-export-components */
import { nanoid } from "nanoid";
import { createContext, useState, useEffect } from "react";

export const recipecontext = createContext(null);

const SEED = [
  {
    id: nanoid(),
    title: "Avocado Toast",
    category: "Breakfast",
    chef: "Yotam Ottolenghi",
    prepTime: "5 min",
    cookTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    desc: "A quick and delicious avocado toast recipe, perfect for a healthy breakfast. Made with sourdough bread, mashed avocado, and cherry tomatoes.",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=800&auto=format&fit=crop",
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
  },
  {
    id: nanoid(),
    title: "Spaghetti Carbonara",
    category: "Dinner",
    chef: "Massimo Bottura",
    prepTime: "10 min",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Medium",
    desc: "A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and black pepper. Rich, creamy, and utterly satisfying — without a drop of cream.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop",
    ingredients: [
      "200g spaghetti",
      "100g guanciale or pancetta, diced",
      "2 large eggs + 2 egg yolks",
      "50g Pecorino Romano, finely grated",
      "50g Parmigiano Reggiano, finely grated",
      "Freshly cracked black pepper",
      "Salt for pasta water",
    ],
    instructions: [
      "Bring a large pot of generously salted water to a boil. Cook spaghetti until al dente, reserving 1 cup of pasta water before draining.",
      "In a bowl, whisk together eggs, yolks, and both cheeses. Season generously with freshly cracked black pepper.",
      "Fry guanciale in a large skillet over medium heat until crispy and the fat has rendered, about 5–7 minutes. Remove from heat.",
      "Add the hot drained pasta to the skillet and toss well to coat in the rendered fat.",
      "Off the heat, pour the egg-cheese mixture over the pasta, tossing vigorously and adding pasta water a splash at a time until the sauce is silky and creamy.",
      "Serve immediately, topped with extra grated cheese and freshly cracked black pepper.",
    ],
  },
  {
    id: nanoid(),
    title: "Chocolate Lava Cake",
    category: "Dessert",
    chef: "Gordon Ramsay",
    prepTime: "15 min",
    cookTime: "12 min",
    servings: 4,
    difficulty: "Hard",
    desc: "Indulgent individual chocolate cakes with a molten, gooey center that flows like lava when you cut in. Best served warm with a scoop of vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
    ingredients: [
      "150g dark chocolate (70% cocoa), chopped",
      "150g unsalted butter, plus extra for greasing",
      "3 large eggs + 3 egg yolks",
      "150g caster sugar",
      "50g plain flour",
      "Pinch of salt",
      "Cocoa powder for dusting",
      "Vanilla ice cream to serve",
    ],
    instructions: [
      "Preheat oven to 200°C (180°C fan). Grease 4 individual ramekins with butter and dust with cocoa powder, tapping out any excess.",
      "Melt chocolate and butter together in a heatproof bowl set over a pan of barely simmering water, stirring until smooth. Remove from heat and cool slightly.",
      "In a large bowl, whisk eggs, egg yolks, and sugar together until pale and fluffy, about 3–4 minutes.",
      "Gently fold the chocolate mixture into the egg mixture, then sift in the flour and a pinch of salt. Fold until just combined — do not overmix.",
      "Divide the batter evenly among the prepared ramekins. Place on a baking tray.",
      "Bake for 10–12 minutes. The edges should be set but the centre should still have a slight wobble.",
      "Run a knife around the edge of each ramekin and invert onto serving plates. Serve immediately with vanilla ice cream.",
    ],
  },
  {
    id: nanoid(),
    title: "Crispy Chicken Tacos",
    category: "Lunch",
    chef: "Ina Garten",
    prepTime: "20 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Medium",
    desc: "Juicy, spice-rubbed chicken thighs crisped in a hot skillet, nestled in warm corn tortillas with fresh slaw, creamy avocado, and a squeeze of lime.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop",
    ingredients: [
      "4 boneless, skinless chicken thighs",
      "1 tsp smoked paprika",
      "1 tsp ground cumin",
      "½ tsp garlic powder",
      "½ tsp chili powder",
      "Salt and freshly ground black pepper",
      "2 tbsp olive oil",
      "8 small corn tortillas",
      "1 cup shredded red cabbage",
      "1 ripe avocado, sliced",
      "Fresh cilantro and lime wedges to serve",
      "Sour cream or Greek yogurt to serve",
    ],
    instructions: [
      "Combine smoked paprika, cumin, garlic powder, chili powder, salt, and pepper. Rub the spice mix all over the chicken thighs.",
      "Heat olive oil in a large cast-iron skillet over medium-high heat until shimmering.",
      "Add the chicken thighs and cook for 6–7 minutes per side until deeply golden and cooked through (internal temp 74°C / 165°F).",
      "Rest the chicken for 5 minutes, then slice or roughly chop into bite-sized pieces.",
      "Warm the tortillas in a dry pan or directly over a gas flame for 30 seconds per side.",
      "Assemble the tacos: layer shredded cabbage, chicken, and avocado slices in each tortilla. Add a dollop of sour cream.",
      "Finish with fresh cilantro, a squeeze of lime, and your favourite hot sauce. Serve immediately.",
    ],
  },
  {
    id: nanoid(),
    title: "Greek Village Salad",
    category: "Lunch",
    chef: "Yotam Ottolenghi",
    prepTime: "15 min",
    cookTime: "0 min",
    servings: 2,
    difficulty: "Easy",
    desc: "A vibrant, no-cook Mediterranean salad loaded with ripe tomatoes, cucumber, kalamata olives, and a generous slab of creamy feta. Simple, fresh, and endlessly satisfying.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop",
    ingredients: [
      "3 large ripe tomatoes, cut into chunks",
      "1 English cucumber, thickly sliced and halved",
      "1 green bell pepper, sliced",
      "½ red onion, thinly sliced",
      "80g kalamata olives",
      "150g block of feta cheese",
      "3 tbsp extra virgin olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Salt and freshly ground black pepper",
    ],
    instructions: [
      "Combine tomatoes, cucumber, green pepper, and red onion in a large bowl.",
      "Scatter the kalamata olives over the vegetables.",
      "Place the block of feta on top — do not crumble it.",
      "Drizzle the olive oil and red wine vinegar over everything.",
      "Sprinkle with dried oregano and season with salt and pepper.",
      "Serve immediately with crusty bread to soak up the juices. Do not toss — let each person mix their own portion.",
    ],
  },
];

const RecipeContext = (props) => {
  const [data, setdata] = useState(() => {
    try {
      const stored = localStorage.getItem("rv_recipes");
      return stored ? JSON.parse(stored) : SEED;
    } catch {
      return SEED;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("rv_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("rv_recipes", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("rv_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <recipecontext.Provider value={{ data, setdata, favorites, toggleFavorite }}>
      {props.children}
    </recipecontext.Provider>
  );
};

export default RecipeContext;
