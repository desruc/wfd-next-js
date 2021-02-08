import {
  useForm,
  UseFormMethods,
  FieldValues,
  Resolver
} from 'react-hook-form';
import { Schema, AsyncValidationOptions, ValidationError } from 'joi';

/**
 * Parses the joi validation error to match api errors
 * @param error the joi validation error
 */
const parseErrorSchema = (error: ValidationError) => {
  const isArray = Array.isArray(error.details);

  if (!isArray) return [];

  const parsedErrors = {};

  error.details.forEach((e) => {
    const { key } = e.context;
    parsedErrors[key] = parsedErrors[key]
      ? [...parsedErrors[key], e.message]
      : [e.message];
  });

  return parsedErrors;
};

/**
 * A joi resolver for react-hook-form
 * @param schema the joi schema
 * @param options (optional) the joi async validation options
 */
export const joiResolver = <TFieldValues extends FieldValues>(
  schema: Schema,
  options: AsyncValidationOptions = {
    abortEarly: false
  }
): Resolver<TFieldValues> => async (values, context) => {
  try {
    return {
      values: await schema.validateAsync(values, {
        ...options,
        context
      }),
      errors: {}
    };
  } catch (e) {
    return {
      values: {},
      errors: parseErrorSchema(e)
    };
  }
};

/**
 * The useForm hook from react-hook-form but uses joi as its resolver
 * @param schema the joi schema
 */
export const useValidatedForm = (schema: Schema): UseFormMethods<FieldValues> =>
  useForm({ resolver: joiResolver(schema) });

export default useValidatedForm;
