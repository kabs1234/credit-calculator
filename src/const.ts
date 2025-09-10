import type { TableCreditFields } from './types/types';
import { getObjectWithErrorMessage } from './utils/utils';

export const BASE_URL = 'https://68ac07727a0bbe92cbb8faee.mockapi.io/api/v1/';

export enum Namespace {
  Credits = 'Credits',
}

export const DEFAULT_SUCCESSFUL_ACTION_MESSAGE = 'Действие было успешным!';

export const DEFAULT_ERROR_ACTION_MESSAGE =
  'Непредвиденная ошибка. Попробуйте выполнить действие снова';

export const FIELD_REQUIRED_ERROR_MESSAGE = getObjectWithErrorMessage(
  'Должно быть заполнено'
);

export const FIELD_NOT_POSITIVE_ERROR_MESSAGE = getObjectWithErrorMessage(
  'Значение должны быть положительным'
);

export const TABLE_CREDIT_FIELDS: TableCreditFields = [
  {
    field: 'id',
    headerName: 'ID заявки',
  },
  {
    field: 'fullName',
    headerName: 'ФИО',
  },
  {
    field: 'phoneNumber',
    headerName: 'Телефон',
  },
  {
    field: 'loanAmount',
    headerName: 'Сумма',
  },
  {
    field: 'loanTerm',
    headerName: 'Срок',
  },
  {
    field: 'interestRate',
    headerName: 'Процентная ставка',
  },
  {
    field: 'status',
    headerName: 'Статус',
  },
];
