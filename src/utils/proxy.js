/**
 * A utility function that checks if two types are equal.
 * @template X, Y, A, B
 * @param {X} x - The first type.
 * @param {Y} y - The second type.
 * @param {A} [a=x] - The type to return if X and Y are equal.
 * @param {B} [b] - The type to return if X and Y are not equal.
 * @returns {A|B} - Returns type A if X and Y are equal, otherwise returns type B.
 */
function ifEquals(x, y, a = x, b) {
    return x === y ? a : b;
  }
  /**
   * A utility function to get the writable keys of an object.
   * @template T
   * @param {T} obj - The object to get writable keys from.
   * @returns {string[]} - An array of writable keys.
   */
  function writableKeys(obj) {
    return Object.keys(obj).filter((key) => {
      try {
        obj[key] = obj[key]; // Check if the property is writable
        return true;
      } catch (e) {
        return false;
      }
    });
  }
  
  /**
   * A function that wraps a WebSocket instance with additional behavior using Proxy.
   * @param {WebSocket} webSocket - The WebSocket instance to wrap.
   * @param {React.MutableRefObject<() => void>} start - A ref containing the reconnect function.
   * @returns {WebSocket} - The wrapped WebSocket instance.
   */
  export const websocketWrapper = (webSocket, start) => {
    return new Proxy(webSocket, {
      get: (obj, key) => {
        const val = obj[key];
        if (key === 'reconnect') return start.current;
        if (typeof val === 'function') {
          console.error('Calling methods directly on the WebSocket is not supported at this moment. You must use the methods returned by useWebSocket.');
          return () => {}; // Prevent error thrown by invoking a non-function
        } else {
          return val;
        }
      },
      set: (obj, key, val) => {
        if (/^on/.test(key)) {
          console.warn("The WebSocket's event handlers should be defined through the options object passed into useWebSocket.");
          return false;
        } else {
          obj[key] = val;
          return true;
        }
      },
    });
  };
  
  export default websocketWrapper;
  