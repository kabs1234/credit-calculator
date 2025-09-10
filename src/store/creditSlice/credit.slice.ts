import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Namespace } from '../../const';
import type { Credit, Credits } from '../../types/types';
import { creditApi } from '../../api/creditApi';

type CreditsSlice = {
  credits: Credits;
  isLoading: boolean;
};

const initialState: CreditsSlice = {
  credits: [],
  isLoading: true,
};

export const creditsSlice = createSlice({
  name: Namespace.Credits,
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>): void {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      creditApi.endpoints.getCredits.matchFulfilled,
      (state, action: PayloadAction<Credits>) => {
        state.credits = action.payload;
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      creditApi.endpoints.createCredit.matchFulfilled,
      (state, action: PayloadAction<Credit>) => {
        state.credits = [...state.credits, action.payload];
      }
    );
    builder.addMatcher(
      creditApi.endpoints.deleteCredit.matchFulfilled,
      (state, action: PayloadAction<Credit>) => {
        const credits = state.credits;
        const deletedCard = action.payload;
        const deletedCardIndex = credits.findIndex((credits) => {
          return credits.id === deletedCard.id;
        });

        state.credits = [
          ...credits.slice(0, deletedCardIndex),
          ...credits.slice(deletedCardIndex + 1),
        ];
      }
    );
  },
});

export const { setIsLoading } = creditsSlice.actions;
