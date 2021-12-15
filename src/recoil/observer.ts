import { useEffect } from 'react';
import { useRecoilValue, RecoilState } from 'recoil';

interface ObserverState<T> {
  node: RecoilState<T>;
  onChange: CallableFunction;
}

export const RecoilObserver = <T>({ node, onChange }: ObserverState<T>) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};
