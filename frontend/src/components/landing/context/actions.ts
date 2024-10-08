// import type { WriteContractErrorType, WaitForTransactionReceiptErrorType } from '@wagmi/core';
import {
  ADD_TASK,
  COMPLETE_TASK,
  DELETE_TASK,
  FETCH_LIST_FAILURE,
  // WITHDRAW_CREDITS_REQUEST,
  // WITHDRAW_CREDITS_PREPARING,
  // WITHDRAW_CREDITS_PENDING,
  // WITHDRAW_CREDITS_SUCCESS,
  // WITHDRAW_CREDITS_FAILURE,
  // WITHDRAW_CREDITS_ERROR,
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  UPDATE_HAS_TODO_LIST,
} from './constants';
import { type Task } from './types';

export const fetchListRequest = () => ({
  type: FETCH_LIST_REQUEST,
});

export const fetchListSuccess = (data: Task[]) => ({
  type: FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchListFailure = (error: any) => ({
  type: FETCH_LIST_FAILURE,
  payload: error,
  error: true,
});

// // Action creators for withdrawing credits
// export const withdrawCreditRequest = (amount: bigint) => ({
//   type: WITHDRAW_CREDITS_REQUEST,
//   payload: {
//     amount,
//   },
// });

// export const withdrawCreditPreparing = () => ({
//   type: WITHDRAW_CREDITS_PREPARING,
// });

// export const withdrawCreditPending = (payload: {
//   hash: Hash; // Adjust the type according to your needs
//   ts: number;
// }) => ({
//   type: WITHDRAW_CREDITS_PENDING,
//   payload,
// });

// export const withdrawCreditSuccess = (payload: {
//   value: bigint; // Adjust the payload structure according to your needs
// }) => ({
//   type: WITHDRAW_CREDITS_SUCCESS,
//   payload,
// });

// export const withdrawCreditFailure = (error: WaitForTransactionReceiptErrorType) => ({
//   // Adjust the error type according to your needs
//   type: WITHDRAW_CREDITS_FAILURE,
//   payload: error,
//   error: true,
// });

// export const withdrawCreditError = (error: WriteContractErrorType) => ({
//   // Adjust the error type according to your needs
//   type: WITHDRAW_CREDITS_ERROR,
//   payload: error,
//   error: true,
// });

export const completeTask = (id: string) => ({
  type: COMPLETE_TASK,
  payload: id,
});

export const addTask = (data: Task) => ({
  type: ADD_TASK,
  payload: data,
});

export const deleteTask = (data: Task) => ({
  type: DELETE_TASK,
  payload: data,
});

export const updateHasTodoList = (hasTodoList: boolean) => ({
  type: UPDATE_HAS_TODO_LIST,
  payload: hasTodoList,
});
