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
  const [isFetching, setIsFetching] = useState(false);
  const [_payload, setPayload] = useState(initialPayload);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /**************************/
  const request = async (service) => {
    // Only reload once
    if (isReloading) {
      setIsReloading(false);
      return;
    }
    try {
      setIsFetching(true);
      let response = await service();
      const { success } = response;
      setData(success);
      return response;
    } catch (error) {
      console.error(error);
      // setError(failure);
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
    setPayload(payload);

    switch (String(type)?.toLowerCase()) {
      case "post":
      case "create":
        return await request(() =>
          service?.post ? service.post(payload) : noService("post")
        );

      case "put":
      case "update":
        return await request(() =>
          service?.put ? service.put(payload) : noService("put")
        );

      case "drop":
      case "delete":
        return await request(() =>
          service?.drop ? service.drop(payload) : noService("drop, delete")
        );

      case "get":
      case "fetch":
      default: {
        return await request(() =>
          service?.get ? service.get(payload) : noService("get")
        );
      }
    }
  };

  const dispatchReload = () => setIsReloading(true);

  // Fetch on mount and watch for subsequent reloads requests
  useEffect(() => {
    if (options.getImmediate && service?.get) {
      dispatchRequest({ type: "get" });
    } else {
      options.getImmediate = true;
    }
  }, [isReloading]);
  console.log({ error, data });
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
