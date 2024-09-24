import { useReducer } from 'react';

const toggleReducer = (i: boolean) => !i;

export function useToggle(initialValue = false) {
  return useReducer(toggleReducer, initialValue);
}
