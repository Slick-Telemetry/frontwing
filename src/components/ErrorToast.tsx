'use client';

import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { globalError } from '@/state-mgmt/store';

import { ToasterToast, useToast } from './ui/use-toast';

export const ErrorToast = () => {
  const [error] = useAtom(globalError);
  const { toast } = useToast();
  const toastRef = useRef<{
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  } | null>(null);

  useEffect(() => {
    if (error.type === 'server') {
      toastRef.current = toast({
        duration: 100000,
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    } else {
      if (toastRef.current) {
        toastRef.current.dismiss();
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Server connected',
        });
      }
    }
  }, [error.type, toast]);

  return null;
};
