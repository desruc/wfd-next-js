import Joi from 'joi';

export const updateProfile = Joi.object().keys({
  firstName: Joi.string().required().messages({
    'string.empty': 'You must provide your first name.',
    'any.required': 'You must provide your first name.'
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'You must provide your last name.',
    'any.required': 'You must provide your last name.'
  })
});

export default updateProfile;
