import { TextField, type TextFieldProps } from '@mui/material';
import type { ReactElement } from 'react';
import type {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';

type NumberInputProps<T extends FieldValues> = {
  label: string;
  field: ControllerRenderProps<T, FieldPath<T>>;
  error: FieldError | undefined;
} & Omit<
  NumericFormatProps<TextFieldProps>,
  'onchange' | 'onBlur' | 'value' | 'disabled' | 'name' | 'ref' | 'error'
>;

export default function NumberInput<T extends FieldValues>({
  label,
  field,
  error,
  ...props
}: NumberInputProps<T>): ReactElement {
  return (
    <NumericFormat
      {...field}
      customInput={TextField}
      error={Boolean(error)}
      helperText={error?.message}
      label={label}
      {...props}
    />
  );
}
