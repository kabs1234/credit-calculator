import { TextField, Button, FormControl, Typography } from '@mui/material';
import { z } from 'zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCreditMutation } from '../../../api/creditApi';
import type { Credit, CreditRequest } from '../../../types/types';
import {
  getObjectWithErrorMessage,
  showSuccessToast,
  showErrorToast,
  getActionErrorMessage,
} from '../../../utils/utils';
import NumberInput from '../../ui/NumberInput/NumberInput.tsx';
import { useQueryAction } from '../../../hooks/hooks.ts';
import {
  FIELD_REQUIRED_ERROR_MESSAGE,
  FIELD_NOT_POSITIVE_ERROR_MESSAGE,
} from '../../../const.ts';

export type FormType = z.infer<typeof formSchema>;

const zodPositiveNumberField = z.coerce
  .number<number>(FIELD_REQUIRED_ERROR_MESSAGE)
  .min(1, FIELD_NOT_POSITIVE_ERROR_MESSAGE);

const formSchema = z.object({
  fullName: z
    .string(FIELD_REQUIRED_ERROR_MESSAGE)
    .min(2, getObjectWithErrorMessage('Имя должно иметь не менее 2 символов.')),
  phoneNumber: z.e164(FIELD_REQUIRED_ERROR_MESSAGE),
  loanAmount: zodPositiveNumberField,
  loanTerm: zodPositiveNumberField,
  interestRate: zodPositiveNumberField,
});

export function CreditForm({ onModalClose }: { onModalClose?: () => void }) {
  const [createCredit] = useCreateCreditMutation();

  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
    },
    mode: 'onSubmit',
  });

  const onSuccesfulAction = (message: string): void => {
    showSuccessToast(message);

    if (onModalClose) {
      onModalClose();
    }
  };

  const tryToCreateCredit = useQueryAction<Credit, CreditRequest>({
    action: createCredit,
    onSuccess: () => onSuccesfulAction('Заявка была успешно подана!'),
    onError: () => showErrorToast(getActionErrorMessage('создать')),
  });

  const onValidForm: SubmitHandler<FormType> = (credit): void => {
    tryToCreateCredit(credit);
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 4,
          backgroundClip: 'text',
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}
      >
        Форма для заявки кредита
      </Typography>

      <form onSubmit={handleSubmit(onValidForm)}>
        <FormControl
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
          }}
        >
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="ФИО"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Телефон"
                type="tel"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="loanAmount"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <NumberInput field={field} error={error} label="Сумма кредита" />
            )}
          />

          <Controller
            name="loanTerm"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <NumberInput field={field} error={error} label="Срок (месяцы)" />
            )}
          />

          <Controller
            name="interestRate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <NumberInput
                field={field}
                error={error}
                label="Процентная ставка"
              />
            )}
          />

          <Button color="primary" variant="contained" type="submit">
            Отправить заявку
          </Button>
        </FormControl>
      </form>
    </>
  );
}
