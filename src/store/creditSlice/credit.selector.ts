import { Namespace } from '../../const';
import type { RootState } from '../store';

export const getCredits = (state: RootState) => {
  return state[Namespace.Credits].credits;
};

export const getIsLoading = (state: RootState) =>
  state[Namespace.Credits].isLoading;
