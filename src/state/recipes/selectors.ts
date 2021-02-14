import { State, Recipe } from 'wfd';

export const selectPublicRecipesLoading = (state: State): boolean =>
  state.recipes.publicRecipesLoading;

export const selectPublicRecipes = (state: State): Recipe[] =>
  state.recipes.publicRecipes;

export const seelctRecipeSaving = (state: State): boolean =>
  state.recipes.recipeSaving;

export const selectRecipeLoading = (state: State): boolean =>
  state.recipes.recipeLoading;

export const selectRecipe = (state: State, recipeId: string): Recipe | null => {
  const recipe =
    state.recipes.publicRecipes.find((r) => r.id === recipeId) ||
    state.recipes.authUserRecipes.find((r) => r.id === recipeId);

  return recipe || null;
};
