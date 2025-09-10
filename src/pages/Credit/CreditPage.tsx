import type { ReactElement } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { getCredits } from '../../store/creditSlice/credit.selector';
import TableCredit from '../../components/app/TableCredit/TableCredit';
import CreditToolbar from '../../components/app/CreditToolbar/CreditToolbar';

export default function CreditPage(): ReactElement {
  const credits = useAppSelector(getCredits);

  return (
    <>
      <CreditToolbar />

      <TableCredit credits={credits} />
    </>
  );
}
