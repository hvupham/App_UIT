import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { DEFAULT_OPTIONS, ReadyState, UNPARSABLE_JSON_OBJECT } from '../utils/constans'
import { createOrJoinSocket } from './create-or-join';
import { getUrl } from './get-url';
import websocketWrapper from './proxy';
export const useWebSocket = (
  url,
  options = DEFAULT_OPTIONS,
  connect = true,
) => {
  const [lastMessage, setLastMessage] = useState({});
  const [readyState, setReadyState] = useState({});
  const lastJsonMessage = useMemo(() => {
    if (lastMessage) {
      try {
        return JSON.parse(lastMessage.data);
      } catch (e) {
        return UNPARSABLE_JSON_OBJECT;
      }
    }
    return null;
  }, [lastMessage]);

  const convertedUrl = useRef("");
  const webSocketRef = useRef(null);
  const startRef = useRef(() => { });
  const reconnectCount = useRef(0);
  const messageQueue = useRef([]);
  const webSocketProxy = useRef(null);
  const optionsCache = useRef(options);
  const readyStateFromUrl =
    convertedUrl.current && readyState[convertedUrl.current] !== undefined ?
      readyState[convertedUrl.current] :
      url !== null && connect === true ?
        ReadyState.CONNECTING :
        ReadyState.UNINSTANTIATED;
  const stringifiedQueryParams = options.queryParams ? JSON.stringify(options.queryParams) : null;
  const sendMessage = useCallback(message => {
    if (webSocketRef.current && webSocketRef.current.readyState === ReadyState.OPEN) {
      webSocketRef.current.send(message);
    } else {
      messageQueue.current.push(message);
    }
  }, []);
  const sendJsonMessage = useCallback(message => {
    sendMessage(JSON.stringify(message));
  }, [sendMessage]);

  const getWebSocket = useCallback(() => {
    if (optionsCache.current?.share !== true && null !== webSocketRef.current) {
      return webSocketRef.current;
    }
    if (webSocketProxy.current === null && webSocketRef.current && startRef.current) {
      webSocketProxy.current = websocketWrapper(webSocketRef.current, startRef);
    } else {
      return webSocketProxy.current;
    }

    return webSocketProxy.current;
  }, [optionsCache]);
  useEffect(() => {
    if (url !== null && connect === true) {
      let removeListeners;
      let expectClose = false;

      const start = async () => {
        convertedUrl.current = await getUrl(url, optionsCache);

        const protectedSetLastMessage = (message) => {
          if (!expectClose) {
            setLastMessage(message);
          }
        };

        const protectedSetReadyState = (state) => {
          if (!expectClose) {
            setReadyState(prev => ({
              ...prev,
              [convertedUrl.current]: state,
            }));
          }
        };
        removeListeners = createOrJoinSocket(
          webSocketRef,
          convertedUrl.current,
          protectedSetReadyState,
          optionsCache,
          protectedSetLastMessage,
          startRef,
          reconnectCount,
        );
      };

      startRef.current = () => {
        if (!expectClose) {
          if (webSocketProxy.current) webSocketProxy.current = null;
          removeListeners?.();
          start();
        }
      };

      start();
      return () => {
        expectClose = true;
        if (webSocketProxy.current) webSocketProxy.current = null;
        removeListeners?.();
        setLastMessage({});
      };
    } else {
      return;
    }
  }, [url, connect, stringifiedQueryParams, optionsCache, sendMessage]);

  useEffect(() => {
    if (readyStateFromUrl === ReadyState.OPEN) {
      messageQueue.current.splice(0).forEach(message => {
        sendMessage(message);
      });
    }
  }, [readyStateFromUrl]);

  return {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState: readyStateFromUrl,
    getWebSocket,
  };
};
