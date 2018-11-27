import {combineReducers, ReducersMapObject} from 'redux';
import {housingReducer} from './get-houses';

export type RootState = {
  housing: ReturnType<typeof housingReducer>;
};

const reducers: ReducersMapObject<RootState> = {
  housing: housingReducer,
};

export default combineReducers(reducers);
