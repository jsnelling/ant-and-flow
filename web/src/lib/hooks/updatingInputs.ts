import { ChangeEventHandler, useCallback } from 'react';
import { useRefresh } from './useRefresh';

export type StringPropsOf<T extends object> = keyof {
  [K in keyof T as NonNullable<T[K]> extends string ? K : never]: T[K];
};

export type NumberPropsOf<T extends object> = keyof {
  [K in keyof T as NonNullable<T[K]> extends number ? K : never]: T[K];
};

type PropsFor<Type extends string | number, Object extends object> =
  Type extends string ? StringPropsOf<Object>
  : Type extends number ? NumberPropsOf<Object>
  : never;

function updatingInput<T extends string | number>(mapper: (s: string) => T) {
  return function <
    Object extends object,
    Prop extends keyof Object & PropsFor<T, Object>,
  >(object: Object, prop: Prop) {
    const { refresh } = useRefresh();

    const val = object[prop];

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        object[prop] = mapper(e.target.value) as Object[Prop];
        refresh();
      },
      [object, prop, refresh],
    );

    return [val, handleChange] as const;
  };
}

export const useStringUpdatingInput = updatingInput<string>((s) => s);
export const useNumberUpdatingInput = updatingInput<number>((s) =>
  parseFloat(s),
);
