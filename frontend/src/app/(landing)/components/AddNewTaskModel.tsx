'use client';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { getTxUrl } from '@/lib/chain';
import { useCreateTask } from '@/lib/hooks/Todolist/functions/useCreateTask';

import { useLandingContext } from '@/components/landing/context/selectors';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { useClient } from '@/providers/ClientProvider';

import formSchema from './form-schema';

// Default values for the form
const DEFAULT_VALUES = {
  title: '',
};

type FormSchemaType = z.infer<typeof formSchema>;

export function AddNewTaskModel({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const { state, addTask } = useLandingContext();
  const [open, setOpen] = useState(false);
  const { account, signAndSubmitTransaction, network } = useWallet();

  const { client } = useClient();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const handleError = (message: string) => {
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  };

  const onSuccess = useCallback(
    (hash: any, title: string) => {
      addTask &&
        addTask({
          id: `${state.list.length + 1}`,
          title,
          status: 'backlog',
        });

      reset(DEFAULT_VALUES);
      setOpen(false);
      toast({
        title: 'Task created successfully!',
        description: (
          <a target='_blank' href={getTxUrl(hash, network?.name)}>
            View transaction on AptosScan
          </a>
        ),
      });
    },
    [state.list, addTask, reset, setOpen, toast],
  );

  // const onError = useCallback((e: Error) => {
  const onError = useCallback((e: unknown) => {
    handleError(e as string);
  }, []);

  const {
    data: hash,
    // isPending,
    // error,
    createTaskAsync,
  } = useCreateTask({
    onError,
    onSuccess,
  });

  console.log(hash, 'hash');
  // console.log(isPending, 'isPending');
  // console.log(error, 'error');

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (!client) {
      handleError(
        'Client not initialized. Please ensure the client is correctly configured.',
      );
      return;
    }

    if (!account?.address) {
      handleError(
        'No account address found. Please connect your wallet and try again.',
      );
      return;
    }

    return createTaskAsync(data.title);

    // try {
    //   // Simulate transaction to estimate gas
    //   const publicKey = new Ed25519PublicKey(account.publicKey.toString());
    //   const [simulationResult] = await client.transaction.simulate.simple({
    //     signerPublicKey: publicKey,
    //     transaction: rawTxn,
    //     options: {
    //       estimateGasUnitPrice: true,
    //       estimateMaxGasAmount: true,
    //       estimatePrioritizedGasUnitPrice: true,
    //     },
    //   });

    //   if (!simulationResult) {
    //     handleError(
    //       'Transaction simulation failed. Please check your network or try again later.',
    //     );
    //     return;
    //   }

    //   // Prepare transaction with gas estimates
    //   const pendingTxn = await signAndSubmitTransaction({
    //     data: payload,
    //     options: {
    //       maxGasAmount: Math.ceil(Number(simulationResult.gas_used) * 1.2),
    //       gasUnitPrice: Number(simulationResult.gas_unit_price),
    //     },
    //   });

    //   // Wait for transaction confirmation
    //   const response = await client.waitForTransaction({
    //     transactionHash: pendingTxn.hash,
    //   });

    //   if (response?.success) {
    //   } else {
    //     handleError(
    //       `Transaction failed: ${response.vm_status}. Please review the transaction details and try again.`,
    //     );
    //   }
    // } catch (error: any) {
    //   handleError(
    //     `An error occurred during the transaction: ${error.message}. Please try again or contact support.`,
    //   );
    // }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create a new task</DialogTitle>
              <DialogDescription>
                Create a new task to track your progress.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='my-3'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Title'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-600 dark:text-red-500' />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                className='py-3 px-4 inline-flex justify-center items-center'
                type='submit'
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Submitting...' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
