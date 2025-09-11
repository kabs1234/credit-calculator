import { TextField, Button, FormControl, Typography, Box } from '@mui/material';
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
import { FIELD_REQUIRED_ERROR_MESSAGE } from '../../../const.ts';
import CreditSummary from '../CreditSummary/CreditSummary.tsx';
import { useState } from 'react';

export type FormType = z.infer<typeof formSchema>;

const zodNumberField = z.coerce.number<number>(FIELD_REQUIRED_ERROR_MESSAGE);

const formSchema = z.object({
  fullName: z
    .string(FIELD_REQUIRED_ERROR_MESSAGE)
    .min(2, getObjectWithErrorMessage('Имя должно иметь не менее 2 символов.')),
  phoneNumber: z.e164(FIELD_REQUIRED_ERROR_MESSAGE),
  loanAmount: zodNumberField.min(
    10001,
    getObjectWithErrorMessage('Значение должны быть больше 10 000')
  ),
  loanTerm: zodNumberField.min(
    4,
    getObjectWithErrorMessage('Значение должны быть больше 3')
  ),
  interestRate: zodNumberField.min(
    1,
    getObjectWithErrorMessage('Значение должны быть больше 1')
  ),
});

export function CreditForm({
  onFormSuccesfulSubmit,
}: {
  onFormSuccesfulSubmit?: () => void;
}) {
  const [calculateToggle, setCalculateToggle] = useState<boolean>(false);

  const [createCredit] = useCreateCreditMutation();

  const { control, handleSubmit, getValues, trigger } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
    },
    mode: 'onSubmit',
  });

  const loanAmount = getValues().loanAmount;
  const loanTerm = getValues().loanTerm;
  const interestRate = getValues().interestRate;

  const onSuccesfulAction = (message: string): void => {
    showSuccessToast(message);

    if (onFormSuccesfulSubmit) {
      onFormSuccesfulSubmit();
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

  const onCalculateButtonClick = (): void => {
    const newestLoanAmount = getValues().loanAmount;
    const newestLoanTerm = getValues().loanTerm;
    const newestInterestRate = getValues().interestRate;

    trigger(['loanAmount', 'loanTerm', 'interestRate']);

    if (
      newestLoanAmount >= 1 &&
      newestLoanTerm >= 1 &&
      newestInterestRate > 0
    ) {
      setCalculateToggle((previousValue) => !previousValue);
    }
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
            gridTemplateRows: 'repeat(3, 1fr)',
            rowGap: '20px',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              columnGap: '20px',
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
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              columnGap: '20px',
            }}
          >
            <Controller
              name="loanAmount"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <NumberInput
                  field={field}
                  error={error}
                  label="Сумма кредита"
                  decimalScale={0}
                />
              )}
            />

            <Controller
              name="loanTerm"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <NumberInput
                  field={field}
                  error={error}
                  label="Срок (месяцы)"
                  decimalScale={0}
                />
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
                  decimalScale={2}
                />
              )}
            />
          </Box>

          <CreditSummary
            interestRate={interestRate}
            loanAmount={loanAmount}
            loanTerm={loanTerm}
            calculateToggle={calculateToggle}
          />

          <Button
            color="primary"
            variant="contained"
            onClick={onCalculateButtonClick}
          >
            Рассчитать
          </Button>

          <Button color="primary" variant="contained" type="submit">
            Отправить заявку
          </Button>
        </FormControl>
      </form>
    </>
  );
}
