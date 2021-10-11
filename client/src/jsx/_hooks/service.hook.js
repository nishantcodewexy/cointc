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
function useService(services) {
  const [prevRequest, setPrevRequest] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /**************************/
  const request = async (service, payload) => {
    try {
      setIsFetching(true);
      return await service(payload);
    } catch (error) {
      // console.error(error);
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

  const dispatchRequest = async ({ type, payload, overwrite = true }) => {
    let response = new Error("");
    // console.log({ prevRequest });

    switch (String(type)?.toLowerCase()) {
      case "post":
      case "create":
        response = await request(
          async (payload) => await services.post(payload),
          payload
        );
        overwrite && setPrevRequest((state) => ({ ...state, [type]: payload }));
        prevRequest?.get &&
          (await dispatchRequest({ type: "get", payload: prevRequest["get"] }));
        return response;

      case "put":
      case "update":
        response = await request(async (payload) => {
          await services.put(payload);
        }, payload);
        overwrite && setPrevRequest((state) => ({ ...state, [type]: payload }));
        prevRequest?.get &&
          (await dispatchRequest({ type: "get", payload: prevRequest["get"] }));

        return response;

      case "drop":
      case "delete":
        response = await request(async (payload) => {
          await services.drop(payload);
        }, payload);
        overwrite && setPrevRequest((state) => ({ ...state, [type]: payload }));
        prevRequest?.get &&
          (await dispatchRequest({ type: "get", payload: prevRequest["get"] }));

        return response;

      case "get":
      case "fetch":
      default: {
        response = await request(async (payload) => {
          let _resp = await services.get(payload);
          setData(_resp);
        }, payload);
        overwrite && setPrevRequest((state) => ({ ...state, [type]: payload }));
        return response;
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
    prevRequest,
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
