import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import {Action} from 'redux';

/** ThunkAction type: <R: return type, S: redux state, E: extra argument, A: action> */
export type Thunk = ThunkAction<void, RootState, null, Action<string | null>>;

export enum HousingAction {
  REQUESTED = 'HousingAction.REQUESTED',
  SUCCESS = 'HousingAction.SUCCESS',
  FAILURE = 'HousingAction.FAILURE',
}
