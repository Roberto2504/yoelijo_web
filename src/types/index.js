// @flow
/* eslint-disable */

import type {
  Store as ReduxStore,
} from 'redux';

type Action = { type : string, payload? : any, error? : boolean }

type State = Object

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action> | any) => any;
export type Obj = { [key: string]: any };