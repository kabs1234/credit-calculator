import { toast } from 'react-toastify';

import {
  DEFAULT_ERROR_ACTION_MESSAGE,
  DEFAULT_SUCCESSFUL_ACTION_MESSAGE,
} from '../const';

import type { CreditActions, ToastPositions } from '../types/types';

export const showErrorToast = (
  message: string = DEFAULT_ERROR_ACTION_MESSAGE,
  position: ToastPositions = 'top-right'
): void => {
  toast.error(message, {
    position,
  });
};

export const showSuccessToast = (
  message: string = DEFAULT_SUCCESSFUL_ACTION_MESSAGE,
  position: ToastPositions = 'top-right'
): void => {
  toast.success(message, {
    position,
  });
};

export const getActionErrorMessage = (action: CreditActions): string => {
  return `Непредвиденная ошибка. Пожалуйста, попробуйте ${action} кредит снова`;
};

export const getObjectWithErrorMessage = (
  message: string
): { error: string } => {
  return {
    error: message,
  };
};

export const getCapitalizedWord = (word: string): string => {
  if (word.length === 0) {
    return word;
  }

  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const getCalculatedMonthlyPayment = (
  loanAmount: number,
  loanTerm: number,
  interestRate: number
): number => {
  const monthlyRate = interestRate / 12 / 100;
  const growthFactor = (1 + monthlyRate) ** loanTerm;

  return loanAmount * ((monthlyRate * growthFactor) / (growthFactor - 1));
};
