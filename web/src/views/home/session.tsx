import { JSX, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WSS_URL = 'ws://localhost:8080';

export const SurveySession = (): JSX.Element => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WSS_URL);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!lastJsonMessage) return;

  //   setLoading(false);
  //   const newItem = lastJsonMessage as SurveyItem;
  //   setSurveyItems((prev) => update(prev, { $push: [newItem] }));
  //   setCurrentItem(newItem);
  // }, [lastJsonMessage]);

  // if (!currentItem) {
  //   return <div>Some Error</div>;
  // }

  return (
    <div className="h-screen flex flex-col justify-center items-center p-4">
      <div className="mt-2">Start</div>
    </div>
  );
};
