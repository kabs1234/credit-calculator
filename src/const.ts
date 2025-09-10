import type { TableCreditFields } from './types/types';

export const BASE_URL = 'https://68ac07727a0bbe92cbb8faee.mockapi.io/api/v1/';

export enum Namespace {
  Credits = 'Credits',
}

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
