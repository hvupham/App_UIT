import { parseSocketIOUrl, appendQueryParams } from './socket-io';

export const getUrl = async (url, optionsRef) => {
  let convertedUrl;

  if (typeof url === 'function') {
    convertedUrl = await url();
  } else {
    convertedUrl = url;
  }

  const parsedUrl = optionsRef.current.fromSocketIO ?
    parseSocketIOUrl(convertedUrl) :
    convertedUrl;

  const parsedWithQueryParams = optionsRef.current.queryParams ?
    appendQueryParams(
      parsedUrl,
      optionsRef.current.queryParams,
      optionsRef.current.fromSocketIO,
    ) :
    parsedUrl;

  return parsedWithQueryParams;
};
