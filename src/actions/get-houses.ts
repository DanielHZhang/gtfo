import Axios from 'axios';
import {Thunk, HousingAction} from './constants';

export const getHouses = (): Thunk => async (dispatch) => {
  dispatch({type: HousingAction.REQUESTED});
  try {
    const response = await Axios.get('/api');
    dispatch({type: HousingAction.SUCCESS, payload: response.data});
  } catch (error) {
    console.log(error);
    dispatch({type: HousingAction.FAILURE, payload: error});
  }
}
