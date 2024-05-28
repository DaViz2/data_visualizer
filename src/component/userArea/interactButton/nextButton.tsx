import { useDispatch, useSelector } from 'react-redux';
import Button from '../board/Button';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../reducer';
import {
  initWebSocket,
  sendWebSocketMessage,
} from '../../../reducer/websocket/webSocket';
import { setLoading } from '../../../reducer/websocket/webSocketSlice';
import { addData, SmallVarData, VarData } from '../../../reducer/vardata';

interface NextButtonProps {
  code: string;
}

interface CodeInfo {
  code: string;
  lang: string;
}

interface Message {
  data: SmallVarData[];
}

interface ResponseProp {
  message: Message;
  line: string;
  requestId: string;
  function: string;
}

function NextButton({ code }: NextButtonProps): JSX.Element {
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
    if (!connected) {
      const codeinfo: CodeInfo = {
        code,
        lang: 'python3',
      };
      await initializeWebSocket();

      try {
        dispatch(setLoading(true));

        const response = await sendWebSocketMessage(codeinfo);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }

      return;
    }

    try {
      const message = {
        command: 'step  ',
      };
      dispatch(setLoading(true));
      const response: ResponseProp = await sendWebSocketMessage(message);
      const newVars: VarData[] = response.message.data.map((value) => {
        return { ...value, functionSpace: response.function };
      });
      newVars.forEach((value) => dispatch(addData(value)));
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return <Button handleExecute={handleExecute} label=">" />;
}

export default NextButton;
