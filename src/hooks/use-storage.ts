/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored != null) setState(JSON.parse(stored));
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  function removeState() {
    sessionStorage.removeItem(key);
  }

  return [state, setState, removeState] as const;
}

export function useReadLocalStorage(key: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored != null) setValue(JSON.parse(stored));
  }, [key]);

  return value;
}

export function useSessionStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    const stored = sessionStorage.getItem(key);
    if (stored != null) setState(JSON.parse(stored));
  }, [key]);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  function removeState() {
    sessionStorage.removeItem(key);
  }

  return [state, setState, removeState] as const;
}

export function useReadSessionStorage(key: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem(key);
    if (stored != null) setValue(JSON.parse(stored));
  }, [key]);

  return value;
}
