import { useState, useEffect } from "react";

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
 * @param {Object | {getImmediate = true}} options - service hook options
 * @returns
 */
function useService(
  service,
  initialPayload = {},
  options = { getImmediate: true }
) {
  const [isReloading, setIsReloading] = useState(false);
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [_payload, setPayload] = useState(initialPayload);

  const request = async (service) => {
    // Only reload once
    try {
      if (isReloading) {
        setIsReloading(false);
        return;
      }
      setIsFetching(true);
      let { success, failure } = await service();
      success ? setData(success) : setError(failure);
    } catch (error) {
      console.error(error);
      setError(error);
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
  const dispatchRequest = ({ type, payload }) => {
    setPayload(payload);

    switch (String(type)?.toLowerCase()) {
      case "post":
      case "create":
        request(() =>
          service?.post ? service.post(_payload) : noService("post")
        );
        break;

      case "put":
      case "update":
        request(() =>
          service?.put ? service.put(_payload) : noService("put")
        );
        break;

      case "drop":
      case "delete":
        request(() =>
          service?.drop ? service.drop(_payload) : noService("drop, delete")
        );
        break;

      case "get":
      case "fetch":
      default: {
        request(() =>
          service?.get ? service.get(_payload) : noService("get")
        );
        break;
      }
    }
  };

  const dispatchReload = () => setIsReloading(true);

  // Fetch on mount and watch for subsequent reloads requests
  useEffect(() => {
    if (options.getImmediate) {
      dispatchRequest({ type: "get" });
    } else {
      options.getImmediate = true;
    }
  }, [isReloading]);

  return {
    data,
    error,
    isFetching,
    isReloading,
    dispatchReload,
    dispatchRequest,
  };
}

function noService(type) {
  let message = `No **${type}** service specified`;
  throw new Error(message);
}
export default useService;
