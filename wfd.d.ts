export interface ApiErrors {
  [x: string]: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface AppSubstate {
  appBootstrapComplete: boolean;
  colorMode: string;
}

export interface RecipeSubstate {
  publicRecipesLoading: boolean;
  publicRecipes: Recipe[];
  recipeSaving: boolean;
  authUserRecipes: Recipe[];
  recipeLoading: boolean;
}

export interface State {
  app: AppSubstate;
  recipes: RecipeSubstate;
}
