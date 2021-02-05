import { useForm, UseFormMethods, FieldValues } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Schema } from 'joi';

/**
 * The useForm hook from react-hook-form but uses joi as its resolver
 * @param schema the joi schema
 */
export const useValidatedForm = (schema: Schema): UseFormMethods<FieldValues> =>
  useForm({ resolver: joiResolver(schema) });

export default useValidatedForm;
