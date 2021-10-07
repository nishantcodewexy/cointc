import { useState, useEffect } from "react";
import qs from "qs";
/**
 * @description - Specify the services to your component will be using. Usually (get, post, put and delete) request
 * @typedef {Object} Services
 * @property {Function} get  - get service
 * @property {Function} post  - post service
 * @property {Function} put  - put service
 * @property {Function} drop  - drop/delete service
 * @returns
 */

/**
 * @function useService - Component request services hook
 * @param {Services} services
 * @param {Object} initialPayload - Initial service payload
 * @param {Object | {getImmediate = false}} options - service hook options
 * @returns
 */
function useService(service) {
  const [prevRequest, setPrevRequest] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /**************************/
  const request = async (service, payload) => {
    try {
      setIsFetching(true);
      await service(payload);
    } catch (error) {
      console.error(error);
      setError(error.message);
      return error;
    } finally {
      setIsFetching(false);
    }
  };

  /**
   * @function dispatchRequest - request dispatcher
   * @param {Object} request
   * @param {String} request.type - Type of request [GET, POST, PUT, DELETE]
   * @param {Object} request.payload - Request payload
   * @returns
   */

  const dispatchRequest = async ({ type, payload }) => {
    switch (String(type)?.toLowerCase()) {
      case "post":
      case "create":
        await request(async (payload) => await service.post(payload), payload);
        setPrevRequest((state) => ({ ...state, [type]: payload }));
        prevRequest['get']  && await request(service.get, prevRequest['get'])
        break;

      case "put":
      case "update":
        await request(async (payload) => {
          await service.put(payload);
        }, payload);
        setPrevRequest((state) => ({ ...state, [type]: payload }));
        prevRequest['get']  && await request(service.get, prevRequest['get'])
        break;

      case "drop":
      case "delete":
        await request(async (payload) => {
          await service.drop(payload);
        }, payload);
        setPrevRequest((state) => ({ ...state, [type]: payload }));
        prevRequest['get']  && await request(service.get, prevRequest['get'])

        break;

      case "get":
      case "fetch":
      default: {
        await request(async (payload) => {
          let response = await service.get(payload);
          setData(response);
        }, payload);
        setPrevRequest((state) => ({ ...state, [type]: payload }));

        break;
      }
    }
  };

  // Retry previous request using a new or the previous payload
  const dispatchRetry = (payload) =>
    prevRequest
      ? request(prevRequest.service, (payload = prevRequest.payload))
      : null;

  return {
    data,
    error,
    isFetching,
    dispatchRetry,
    dispatchRequest,
  };
}

function noService(type) {
  let message = `No **${type}** service specified`;
  throw new Error(message);
}
export default useService;
