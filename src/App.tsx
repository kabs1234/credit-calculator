import type { ReactElement } from 'react';
import { useGetCreditsQuery } from './api/creditApi';
import Loader from './components/ui/Loader/Loader';
import CreditPage from './pages/Credit/CreditPage';

export default function App(): ReactElement {
  const { isError, isLoading, isUninitialized } = useGetCreditsQuery();

  if (isLoading || isUninitialized) {
    return <Loader />;
  }

  if (isError) {
    return <p>Unexpected error occured! Try to reload the page please!</p>;
  }

  return <CreditPage />;
}
