import Joi from 'joi';

export const createRecipe = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.empty': 'You must give you recipe a title.',
    'any.required': 'You must give your recipe a title.'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'You must give you recipe a description.',
    'any.required': 'You must give you recipe a description.'
  }),
  prepTime: Joi.string().allow(null, ''),
  cookingTime: Joi.string().required().messages({
    'string.empty': 'You must specify how long it takes to cook your recipe.',
    'any.required': 'You must specify how long it takes to cook your recipe.'
  }),
  public: Joi.bool(),
  instructions: Joi.string().required().messages({
    'string.empty': 'You must supply instructions.',
    'any.required': 'You must supply instructions.'
  }),
  originalUrl: Joi.string()
    .uri()
    .message('You must supply a valid URL.')
    .allow(null, '')
});

export default createRecipe;
