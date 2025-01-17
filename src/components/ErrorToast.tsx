'use client';

import { useEffect, useRef } from 'react';

import { ToasterToast, useToast } from './ui/use-toast';

export const ErrorToast = () => {
  const [error] = [false];
  const { toast } = useToast();
  const toastRef = useRef<{
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  } | null>(null);

  useEffect(() => {
    if (error) {
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
  }, [error, toast]);

  return null;
};
