import {produce} from 'immer';
import {HousingAction} from '../actions/constants';
import {Action} from 'redux';
import {HouseData} from './data-types';

interface IAction<T, P> extends Action<T> {
  payload: P;
}

export type Status = 'idle' | 'requested' | 'success' | 'failure';

type State = {
  status: Status;
  data: HouseData[];
};

const initial: State = {
  status: 'idle',
  data: null,
};

export const housingReducer = (state = initial, action: IAction<HousingAction, HouseData[]>) => produce(state, (draft) => {
  switch (action.type) {
    case HousingAction.SUCCESS: {
      draft.status = 'success';
      draft.data = action.payload.sort((a, b) => a.rent.value < b.rent.value ? -1 : 1);
      return;
    }
    case HousingAction.REQUESTED: {
      draft.status = 'requested';
      return;
    }
    default: {
      return;
    }
  }
});
