import { AnyAction } from 'redux';

import { RecipeSubstate } from 'wfd';

import { mergeArray } from '~/utils/helpers';

import * as types from './types';

export const initialRecipeSubstate: RecipeSubstate = {
  publicRecipesLoading: false,
  publicRecipes: [],
  recipeSaving: false,
  authUserRecipes: [],
  recipeLoading: false
};

const recipesReducer = (
  state = initialRecipeSubstate,
  action: AnyAction
): RecipeSubstate => {
  switch (action.type) {
    case types.GET_PUBLIC_RECIPES_LOADING_STATE:
      return {
        ...state,
        publicRecipesLoading: action.state
      };

    case types.GET_PUBLIC_RECIPES_SUCCESS:
      return {
        ...state,
        publicRecipes: mergeArray(state.publicRecipes, action.publicRecipes)
      };

    case types.CREATE_RECIPE_SAVING_STATE:
      return {
        ...state,
        recipeSaving: action.state
      };

    case types.CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        publicRecipes: action.recipe.public
          ? [...state.publicRecipes, action.recipe]
          : state.publicRecipes,
        authUserRecipes: mergeArray(state.authUserRecipes, [action.recipe])
      };

    case types.GET_RECIPE_LOADING_STATE:
      return {
        ...state,
        recipeLoading: action.state
      };

    case types.GET_SINGLE_RECIPE_SUCCESS:
      return {
        ...state,
        publicRecipes: action.recipe.public
          ? mergeArray(state.publicRecipes, [action.recipe])
          : state.publicRecipes,
        authUserRecipes: mergeArray(state.authUserRecipes, [action.recipe])
      };

    default:
      return state;
  }
};

export default recipesReducer;
