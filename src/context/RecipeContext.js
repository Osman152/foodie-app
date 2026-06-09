import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext(null);

export const CATEGORIES = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Desserts',
  'Snacks',
  'Vegetarian',
  'Vegan',
  'Seafood',
  'Pasta',
  'Soups',
  'Salads',
];

export const SAMPLE_RECIPES = [
  {
    id: '1',
    name: 'Avocado Toast',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500',
    prepTime: '10 min',
    servings: 2,
    calories: 320,
    difficulty: 'Easy',
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      '2 eggs',
      'Salt & pepper',
      'Red chili flakes',
      'Lemon juice',
      'Olive oil',
    ],
    instructions: [
      'Toast bread until golden brown.',
      'Mash avocado with lemon juice, salt and pepper.',
      'Fry or poach eggs to your liking.',
      'Spread avocado on toast, top with egg.',
      'Sprinkle chili flakes and drizzle olive oil.',
    ],
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500',
    prepTime: '25 min',
    servings: 4,
    calories: 620,
    difficulty: 'Medium',
    ingredients: [
      '400g spaghetti',
      '200g pancetta or guanciale',
      '4 large egg yolks',
      '100g Pecorino Romano',
      '100g Parmesan',
      'Freshly ground black pepper',
      'Salt',
    ],
    instructions: [
      'Cook spaghetti in salted water until al dente.',
      'Fry pancetta until crispy, reserve fat.',
      'Whisk yolks with grated cheeses and black pepper.',
      'Remove pan from heat, add drained pasta and toss.',
      'Add egg mixture quickly, tossing to coat — the residual heat cooks the eggs.',
      'Serve immediately with extra cheese and pepper.',
    ],
  },
  {
    id: '3',
    name: 'Caesar Salad',
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500',
    prepTime: '15 min',
    servings: 2,
    calories: 280,
    difficulty: 'Easy',
    ingredients: [
      '1 large romaine lettuce',
      '100g croutons',
      '50g shaved Parmesan',
      '3 tbsp Caesar dressing',
      '2 garlic cloves',
      '1 tbsp lemon juice',
      '1 tsp anchovy paste',
    ],
    instructions: [
      'Wash and tear romaine leaves into pieces.',
      'Mix dressing with garlic, lemon, anchovy paste.',
      'Toss lettuce generously with dressing.',
      'Add croutons and shaved Parmesan on top.',
      'Season and serve immediately.',
    ],
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
    prepTime: '20 min',
    servings: 4,
    calories: 450,
    difficulty: 'Medium',
    ingredients: [
      '200g dark chocolate (70%)',
      '100g unsalted butter',
      '4 whole eggs',
      '4 egg yolks',
      '80g caster sugar',
      '40g all-purpose flour',
      'Cocoa powder for dusting',
    ],
    instructions: [
      'Preheat oven to 220°C / 425°F.',
      'Melt chocolate and butter together in a double boiler.',
      'Whisk eggs, yolks, and sugar until pale and thick.',
      'Fold chocolate into egg mixture, then sift in flour.',
      'Pour into greased and dusted ramekins.',
      'Bake 10-12 minutes until edges are set but center still jiggles.',
    ],
  },
  {
    id: '5',
    name: 'Grilled Salmon',
    category: 'Seafood',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500',
    prepTime: '20 min',
    servings: 2,
    calories: 380,
    difficulty: 'Easy',
    ingredients: [
      '2 salmon fillets (200g each)',
      '2 tbsp olive oil',
      '1 lemon',
      '3 garlic cloves, minced',
      'Fresh dill',
      'Salt & pepper',
      '2 tbsp capers',
    ],
    instructions: [
      'Pat salmon dry and season with salt, pepper, and olive oil.',
      'Preheat grill or skillet to high heat.',
      'Grill salmon 4-5 minutes per side until cooked through.',
      'Squeeze lemon over salmon and garnish with fresh dill.',
      'Serve with capers and lemon wedges on the side.',
    ],
  },
  {
    id: '6',
    name: 'Vegetable Curry',
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
    prepTime: '35 min',
    servings: 4,
    calories: 290,
    difficulty: 'Medium',
    ingredients: [
      '1 can (400g) chickpeas, drained',
      '1 can (400ml) coconut milk',
      '2 ripe tomatoes, chopped',
      '1 large onion, diced',
      '2 tbsp curry powder',
      '1 tbsp fresh ginger, grated',
      '3 garlic cloves',
      '2 cups baby spinach',
    ],
    instructions: [
      'Sauté onion in oil until golden, about 5 minutes.',
      'Add garlic and ginger, cook 1 minute.',
      'Add curry powder and stir for 30 seconds.',
      'Add tomatoes, coconut milk, and chickpeas.',
      'Simmer on medium-low for 20 minutes, stirring occasionally.',
      'Stir in spinach until wilted. Serve with rice or naan.',
    ],
  },
  {
    id: '7',
    name: 'French Onion Soup',
    category: 'Soups',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500',
    prepTime: '60 min',
    servings: 4,
    calories: 340,
    difficulty: 'Hard',
    ingredients: [
      '6 large yellow onions, thinly sliced',
      '1.2L beef broth',
      '200g Gruyère cheese, grated',
      '8 slices baguette',
      '4 tbsp unsalted butter',
      '150ml dry white wine',
      '4 sprigs thyme',
      '2 bay leaves',
    ],
    instructions: [
      'Slowly caramelize onions in butter over low heat for 40 minutes.',
      'Add wine and reduce by half.',
      'Pour in broth, add thyme and bay leaves. Simmer 20 minutes.',
      'Ladle soup into oven-safe bowls.',
      'Float baguette slices on top and pile with Gruyère.',
      'Broil on high until cheese is golden and bubbly.',
    ],
  },
  {
    id: '8',
    name: 'Caprese Salad',
    category: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1572448862527-d3c904757de6?w=500',
    prepTime: '10 min',
    servings: 2,
    calories: 220,
    difficulty: 'Easy',
    ingredients: [
      '250g fresh mozzarella',
      '3 large heirloom tomatoes',
      'Handful of fresh basil leaves',
      '3 tbsp extra virgin olive oil',
      '2 tbsp balsamic glaze',
      'Flaky sea salt',
      'Cracked black pepper',
    ],
    instructions: [
      'Slice tomatoes and mozzarella into 1cm rounds.',
      'Arrange alternating slices on a serving plate.',
      'Tuck fresh basil leaves between the slices.',
      'Drizzle generously with olive oil and balsamic glaze.',
      'Finish with sea salt and cracked black pepper.',
    ],
  },
  {
    id: '9',
    name: 'Beef Tacos',
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
    prepTime: '25 min',
    servings: 4,
    calories: 520,
    difficulty: 'Easy',
    ingredients: [
      '500g lean ground beef',
      '8 corn or flour taco shells',
      '1 packet taco seasoning',
      '100g shredded cheddar',
      '1 cup shredded lettuce',
      '4 tbsp sour cream',
      '4 tbsp salsa',
      '1 lime',
    ],
    instructions: [
      'Brown ground beef in a skillet over medium-high heat.',
      'Drain excess fat, add taco seasoning and 60ml water.',
      'Simmer 5 minutes until sauce thickens.',
      'Warm taco shells in the oven at 180°C for 3-4 minutes.',
      'Fill shells with meat and your choice of toppings.',
      'Squeeze lime over tacos and serve immediately.',
    ],
  },
  {
    id: '10',
    name: 'Chicken Stir Fry',
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
    prepTime: '20 min',
    servings: 3,
    calories: 410,
    difficulty: 'Easy',
    ingredients: [
      '500g chicken breast, thinly sliced',
      '3 cups mixed vegetables (broccoli, bell pepper, snap peas)',
      '4 tbsp soy sauce',
      '1 tbsp fresh ginger, grated',
      '3 garlic cloves, minced',
      '1 tbsp sesame oil',
      '1 tbsp cornstarch',
      '2 cups steamed jasmine rice',
    ],
    instructions: [
      'Marinate chicken in soy sauce and cornstarch for 10 minutes.',
      'Heat wok until smoking hot.',
      'Stir fry chicken in batches until golden and cooked through.',
      'Add garlic and ginger, cook 30 seconds.',
      'Add vegetables and stir fry 3-4 minutes until tender-crisp.',
      'Drizzle sesame oil, toss and serve over steamed rice.',
    ],
  },
  {
    id: '11',
    name: 'Banana Pancakes',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500',
    prepTime: '20 min',
    servings: 3,
    calories: 360,
    difficulty: 'Easy',
    ingredients: [
      '2 very ripe bananas',
      '2 large eggs',
      '1 cup all-purpose flour',
      '1 cup whole milk',
      '1 tsp baking powder',
      '2 tbsp honey',
      '1 tbsp butter',
      '1 tsp vanilla extract',
    ],
    instructions: [
      'Mash bananas thoroughly in a large bowl.',
      'Whisk eggs and vanilla into the banana.',
      'Stir in flour, milk, and baking powder until just combined.',
      'Melt butter in a non-stick pan over medium heat.',
      'Pour 1/4 cup batter per pancake, cook 2-3 min each side.',
      'Serve stacked with honey and fresh fruit.',
    ],
  },
  {
    id: '12',
    name: 'Energy Bites',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500',
    prepTime: '15 min',
    servings: 20,
    calories: 120,
    difficulty: 'Easy',
    ingredients: [
      '1 cup rolled oats',
      '1/2 cup peanut butter',
      '1/3 cup honey',
      '1/2 cup dark chocolate chips',
      '2 tbsp ground flax seeds',
      '1 tsp vanilla extract',
    ],
    instructions: [
      'Combine all ingredients in a large mixing bowl.',
      'Stir until everything is evenly mixed.',
      'Cover and refrigerate the mixture for 30 minutes.',
      'Roll into 1-inch balls using damp hands.',
      'Place on a parchment-lined sheet and refrigerate until firm.',
      'Store in an airtight container in the fridge for up to 1 week.',
    ],
  },
];

export function RecipeProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const addMyRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: 'my_' + Date.now() };
    setMyRecipes((prev) => [newRecipe, ...prev]);
    return newRecipe;
  };

  const updateMyRecipe = (id, updated) => {
    setMyRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
  };

  const deleteMyRecipe = (id) => {
    setMyRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => prev.filter((fid) => fid !== id));
  };

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        toggleFavorite,
        myRecipes,
        addMyRecipe,
        updateMyRecipe,
        deleteMyRecipe,
        sampleRecipes: SAMPLE_RECIPES,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipes must be used inside RecipeProvider');
  return ctx;
}
