import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import type { TypedMutationTrigger } from '@reduxjs/toolkit/query/react';
import { useAppDispatch } from './store';
import { setIsLoading } from '../store/creditSlice/credit.slice';

export const useQueryAction = <ResultType, QueryArg>({
  action,
  onSuccess,
  onError,
}: {
  action: TypedMutationTrigger<
    ResultType,
    QueryArg,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      object,
      FetchBaseQueryMeta
    >
  >;
  onSuccess?: () => void;
  onError?: () => void;
}): ((payload: QueryArg) => Promise<void>) => {
  const dispatch = useAppDispatch();

  const tryToExecuteAction = async (payload: QueryArg): Promise<void> => {
    try {
      dispatch(setIsLoading(true));
      await action(payload).unwrap();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (onError) {
        onError();
      }
      throw err;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return tryToExecuteAction;
};
