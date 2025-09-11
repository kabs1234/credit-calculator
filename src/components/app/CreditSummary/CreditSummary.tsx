import { Box, TextField } from '@mui/material';
import { useEffect, useState, type ReactElement } from 'react';
import { getCalculatedMonthlyPayment } from '../../../utils/utils';

export default function CreditSummary({
  loanAmount,
  loanTerm,
  interestRate,
  calculateToggle,
}: {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  calculateToggle: boolean;
}): ReactElement {
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalOverpayment, setTotalOverpayment] = useState<number>(0);

  useEffect(() => {
    if (loanAmount >= 1 && loanTerm >= 1 && interestRate > 0) {
      const calculatedMonthyPayment = getCalculatedMonthlyPayment(
        loanAmount,
        loanTerm,
        interestRate
      );
      const calculatedTotalPayment = calculatedMonthyPayment * loanTerm;
      const calculatedTotalOverpayment = calculatedTotalPayment - loanAmount;

      setMonthlyPayment(Math.round(calculatedMonthyPayment));
      setTotalPayment(Math.round(calculatedTotalPayment));
      setTotalOverpayment(Math.round(calculatedTotalOverpayment));
    }
  }, [calculateToggle]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: '20px',
      }}
    >
      <TextField value={monthlyPayment} label="Ежемесячный платёж" />
      <TextField value={totalOverpayment} label="Переплата по кредиту" />
      <TextField value={totalPayment} label="Сумма всех выплат" />
    </Box>
  );
}
