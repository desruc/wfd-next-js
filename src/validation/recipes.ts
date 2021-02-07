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
  time: Joi.string().required().messages({
    'string.empty': 'You must specify how long it takes to cook your recipe.',
    'any.required': 'You must specify how long it takes to cook your recipe.'
  }),
  public: Joi.bool()
});

export default createRecipe;
