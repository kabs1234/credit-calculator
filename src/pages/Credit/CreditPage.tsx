import type { ReactElement } from 'react';
import { getCredits } from '../../store/creditSlice/credit.selector';
import TableCredit from '../../components/app/TableCredit/TableCredit';
import CreditToolbar from '../../components/app/CreditToolbar/CreditToolbar';
import { useAppSelector } from '../../hooks/store';

export default function CreditPage(): ReactElement {
  const credits = useAppSelector(getCredits);

  return (
    <>
      <CreditToolbar />

      <TableCredit credits={credits} />
    </>
  );
}
