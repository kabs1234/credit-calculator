export type Credit = {
  id: string;
  fullName: string;
  phoneNumber: string;
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  status: string;
};

export type Credits = Credit[];

export type TableCreditField = {
  field: keyof Credit;
  headerName: string;
};

export type TableCreditFields = TableCreditField[];

export type CreditRequest = Omit<Credit, 'status' | 'id'>;

export type CreditActions = 'создать' | 'удалить';

export type ToastPositions =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';
