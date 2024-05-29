import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from './reducer';
import { AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
