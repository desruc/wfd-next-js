import { Dispatch } from 'redux';
import axios from 'axios';
import getConfig from 'next/config';

import * as types from './types';

const {
  publicRuntimeConfig: { portalBase }
} = getConfig();

export const getPublicRecipes = () => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const {
      data: { data }
    } = await axios.get(`${portalBase}/api/recipes/public`);

    dispatch({
      type: types.GET_PUBLIC_RECIPES_SUCCESS,
      publicRecipes: data
    });
  } catch (error) {
    dispatch({
      type: types.GET_PUBLIC_RECIPES_ERROR,
      error
    });
  }
};

interface CreateRecipePayload {
  [x: string]: string;
}

export const createRecipe = (recipe: CreateRecipePayload) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const {
      data: { data }
    } = await axios.post(`${portalBase}/api/recipes`, recipe);

    dispatch({
      type: types.CREATE_RECIPE_SUCCESS,
      recipe: data
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_RECIPE_ERROR,
      error
    });
  }
};

export default getPublicRecipes;
