import { ClientState } from '~/state/rootReducer';

interface AnyObject {
  [key: string]: string | number | boolean;
}

export const selectPublicRecipesLoading = (state: ClientState): boolean =>
  state.recipes.publicRecipesLoading;

export const selectPublicRecipes = (state: ClientState): AnyObject[] =>
  state.recipes.publicRecipes;

export const seelctRecipeSaving = (state: ClientState): boolean =>
  state.recipes.recipeSaving;

export const selectRecipeLoading = (state: ClientState): boolean =>
  state.recipes.recipeLoading;

export const selectRecipe = (
  state: ClientState,
  recipeId: string
): AnyObject | null => {
  const recipe =
    state.recipes.publicRecipes.find((r) => r.id === recipeId) ||
    state.recipes.authUserRecipes.find((r) => r.id === recipeId);

  return recipe || null;
};
