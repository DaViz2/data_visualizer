import { useDispatch, useSelector } from 'react-redux';
import Button from '../board/Button';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../reducer';
import {
  initWebSocket,
  sendWebSocketMessage,
} from '../../../reducer/websocket/webSocket';
import {
  setLoading,
  setResponse,
} from '../../../reducer/websocket/webSocketSlice';

function NextButton(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { connected } = useSelector((state: RootState) => state.webSocket);

  const initializeWebSocket = async () => {
    try {
      await initWebSocket(dispatch);
      console.log('WebSocket initialized');
    } catch (error) {
      console.error('WebSocket initialization failed:', error);
    }
  };

  const handleExecute = async () => {
    const message = {
      value: 'next',
    };

    if (!connected) {
      await initializeWebSocket();
      // Todo: 코드 전송
      message.value = 'code';
    }

    try {
      dispatch(setLoading(true));
      const response = await sendWebSocketMessage(message);
      dispatch(setResponse(response));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return <Button handleExecute={handleExecute} label=">" />;
}

export default NextButton;
