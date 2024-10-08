// https://github.com/redux-utilities/redux-actions/blob/master/src/handleAction.js
// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
import Debug from 'debug';

import { createReducer } from '@/lib/middlewares';

import {
  handleAddTask,
  handleCompleteTask,
  handleDeleteTask,
  handleListFailure,
  handleListRequest,
  handleListSuccess,
  updateHasTodoList,
} from './tasks';
import {
  ADD_TASK,
  COMPLETE_TASK,
  DELETE_TASK,
  FETCH_LIST_FAILURE,
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  UPDATE_HAS_TODO_LIST,
} from '../constants';
import { type InitialLandingState } from '../types';

const debug = Debug('views:landing:context:reducer');

// export interface GenerateInitialState {}

export function generateInitialState(): InitialLandingState {
  debug('generate initial state');

  return {
    fetchStatus: null,
    errors: null,
    hasTodoList: false,
    list: [],
    data: {},
  };
}

export default createReducer<InitialLandingState>({
  handlers: {
    [FETCH_LIST_REQUEST]: handleListRequest,
    [FETCH_LIST_SUCCESS]: handleListSuccess,
    [FETCH_LIST_FAILURE]: handleListFailure,
    [COMPLETE_TASK]: handleCompleteTask,
    [ADD_TASK]: handleAddTask,
    [DELETE_TASK]: handleDeleteTask,
    [UPDATE_HAS_TODO_LIST]: updateHasTodoList,
    // [WITHDRAW_CREDITS_REQUEST]: handleWithdrawCreditsRequest,
    // [WITHDRAW_CREDITS_PREPARING]: handleWithdrawCreditsPreparing,
    // [WITHDRAW_CREDITS_PENDING]: handleWithdrawCreditsPending,
    // [WITHDRAW_CREDITS_SUCCESS]: handleWithdrawCreditsSuccess,
    // [WITHDRAW_CREDITS_FAILURE]: handleWithdrawCreditsFailure,
    // [WITHDRAW_CREDITS_ERROR]: handleWithdrawCreditsError,
  },
  before: [],
  after: [],
});
