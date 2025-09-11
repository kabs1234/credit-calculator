import { Button } from '@mui/material';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  TypedUseMutation,
} from '@reduxjs/toolkit/query/react';
import type { ReactElement } from 'react';
import { useQueryAction } from '../../../hooks/hooks';
import { useAppSelector } from '../../../hooks/store';
import type { CreditActions } from '../../../types/types';
import {
  showSuccessToast,
  showErrorToast,
  getActionErrorMessage,
} from '../../../utils/utils';
import { getIsLoading } from '../../../store/creditSlice/credit.selector';

export default function ActionButton<ResultType, QueryArg>({
  text,
  isGloballyDisabled,
  payload,
  actionStateTexts,
  mutation,
  onSuccess,
  onError,
}: {
  text: string;
  isGloballyDisabled?: boolean;
  payload: QueryArg;
  actionStateTexts: {
    success: string;
    error: CreditActions;
  };
  mutation: TypedUseMutation<
    ResultType,
    QueryArg,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      object,
      FetchBaseQueryMeta
    >
  >;
  onSuccess?: () => void;
  onError?: () => void;
}): ReactElement {
  const [action, actionResult] = mutation();
  const isLoading = useAppSelector(getIsLoading);
  const isDisabled = isGloballyDisabled ? isLoading : actionResult.isLoading;

  const showSuccesfulActionMessage = (): void => {
    showSuccessToast(actionStateTexts.success, 'top-center');
  };

  const showErrorActionMessage = (): void => {
    showErrorToast(getActionErrorMessage(actionStateTexts.error), 'top-center');
  };

  const tryToDeleteCredit = useQueryAction<ResultType, QueryArg>({
    action: action,
    onSuccess: onSuccess ?? showSuccesfulActionMessage,
    onError: onError ?? showErrorActionMessage,
  });

  const onButtonClick = (): void => {
    tryToDeleteCredit(payload);
  };

  return (
    <Button onClick={onButtonClick} disabled={isDisabled}>
      {text}
    </Button>
  );
}
