import { ADD_DATA, DataHandleTypes, GET_DATA, VarData } from '../actions/types';

interface DataState {
  data: VarData[];
}

const initialState: DataState = {
  data: [],
};

const dataHandler = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: DataHandleTypes,
): DataState => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case GET_DATA:
      return state;
    default:
      return state;
  }
};

export default dataHandler;
