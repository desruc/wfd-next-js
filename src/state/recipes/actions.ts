import { Dispatch } from 'redux';
import axios from 'axios';
import getConfig from 'next/config';

import * as types from './types';

const {
  publicRuntimeConfig: { apiBase }
} = getConfig();

export const getPublicRecipes = () => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const {
      data: { data }
    } = await axios.get(`${apiBase}/recipes`);
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

export default getPublicRecipes;