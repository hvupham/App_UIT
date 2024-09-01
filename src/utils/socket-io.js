import { SOCKET_IO_PING_INTERVAL, SOCKET_IO_PATH, SOCKET_IO_PING_CODE } from './constants';

/**
 * Hàm để phân tích và xây dựng lại URL của Socket.IO
 * @param {string} url - URL gốc
 * @returns {string} - URL đã được chỉnh sửa để sử dụng với Socket.IO
 */
export const parseSocketIOUrl = (url) => {
  if (url) {
    const isSecure = /^https|wss/.test(url);
    const strippedProtocol = url.replace(/^(https?|wss?)(:\/\/)?/, '');
    const removedFinalBackSlash = strippedProtocol.replace(/\/$/, '');
    const protocol = isSecure ? 'wss' : 'ws';
    return `${protocol}://${removedFinalBackSlash}${SOCKET_IO_PATH}`;
  }
  return url;
};
/**
 * Hàm để thêm các tham số truy vấn vào URL
 * @param {string} url - URL gốc
 * @param {Object} params - Các tham số truy vấn cần thêm vào URL
 * @param {boolean} alreadyHasParams - Cờ để kiểm tra URL đã có tham số truy vấn hay chưa
 * @returns {string} - URL với các tham số truy vấn đã được thêm vào
 */
export const appendQueryParams = (url, params = {}, alreadyHasParams = false) => {
  const stringified = `${Object.entries(params).reduce((next, [key, value]) => {
    return next + `${key}=${value}&`;
  }, '').slice(0, -1)}`;
  return `${url}${alreadyHasParams ? '&' : '?'}${stringified}`;
};
/**
 * Hàm để thiết lập cơ chế ping cho WebSocket
 * @param {WebSocket} socketInstance - Thể hiện của WebSocket cần thiết lập ping
 * @returns {number} - ID của interval để có thể dừng lại nếu cần thiết
 */
export const setUpSocketIOPing = (socketInstance) => {
  const ping = () => socketInstance.send(SOCKET_IO_PING_CODE);
  return setInterval(ping, SOCKET_IO_PING_INTERVAL);
};
