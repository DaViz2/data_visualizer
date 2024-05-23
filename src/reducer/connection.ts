import {
  ADD_CONNECTION,
  ConnectionHandleTypes,
  EdgeConnection,
} from '../actions/types';

interface ConnectionState {
  connections: EdgeConnection[];
}

const initialState: ConnectionState = {
  connections: [],
};

const connectionHandler = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: ConnectionHandleTypes,
): ConnectionState => {
  switch (action.type) {
    case ADD_CONNECTION:
      return {
        ...state,
        connections: [...state.connections, action.payload],
      };
    default:
      return state;
  }
};

export default connectionHandler;
