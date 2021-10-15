import { useState, useEffect } from "react";
import qs from "qs";
import { useDispatch } from "react-redux";
import _actions from "../_actions";
import {SERVICE} from '../_constants'
const { user } = _actions;
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
  const dispatch = useDispatch();
 
  const [requestStack, setRequestStack] = useState([]);
  const [lastRequestType, setLastRequestType] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [_toast, setToast] = useState(null);
  /**************************/
  async function handleResponse(response, save = false, toast = false) {
    let { success, error, statusCode } = response;
    // debugger;
    if (error) {
      setError(error);
      toast && _toast?.error && _toast?.error(error);
      if (statusCode == 401) {
        dispatch(user.logout());
      }
    } else {
      if (save) {
        setData(success);
      }
      toast && _toast?.success && _toast?.success(success);
    }
    return response;
  }

  /**
   * @function dispatchRequest - request dispatcher
   * @param {Object} request
   * @param {String} request.type - Type of request [GET, POST, PUT, DELETE]
   * @param {Object} request.payload - Request payload
   * @returns
   */

  async function dispatchRequest(request) {
    try {
      const { type, payload, toast = _toast, overwrite = true } = request;
      toast && setToast(toast);

      let response = new Error("");
      setIsFetching(true);
      setLastRequestType(type);

      switch (String(type)?.toLowerCase()) {
        // CREATE --------------------------------------------

        case SERVICE?.CREATE:
          response = await services[SERVICE?.CREATE](payload);
          handleResponse(response, false, true);

          // Bulk Retrieve the list after request
          requestStack[SERVICE?.BULK_RETRIEVE] &&
            dispatchRequest(requestStack[SERVICE?.BULK_RETRIEVE]);
          break;

        case SERVICE?.BULK_CREATE: {
          break;
        }

        // UPDATE --------------------------------------------

        case SERVICE?.UPDATE:
          response = await services[SERVICE?.UPDATE](payload);
          handleResponse(response, false, true);

          // Bulk Retrieve the list after request
          requestStack[SERVICE?.BULK_RETRIEVE] &&
            dispatchRequest(requestStack[SERVICE?.BULK_RETRIEVE]);

          break;

        case SERVICE?.BULK_UPDATE: {
          return;
        }

        // DROP --------------------------------------------

        case SERVICE?.DROP: {
          response = await services[SERVICE?.DROP](payload);
          handleResponse(response, false, true);

          // Bulk Retrieve the list after request
          requestStack[SERVICE?.BULK_RETRIEVE] &&
            dispatchRequest(requestStack[SERVICE?.BULK_RETRIEVE]);

          break;
        }

        case SERVICE?.BULK_DROP:
          response = await services[SERVICE?.BULK_DROP](payload);
          handleResponse(response, false, true);

          // Bulk Retrieve the list after request
          requestStack[SERVICE?.BULK_RETRIEVE] &&
            dispatchRequest(requestStack[SERVICE?.BULK_RETRIEVE]);

          break;

        // RETRIEVE --------------------------------------------

        case SERVICE?.RETRIEVE:
          response = await services[SERVICE?.RETRIEVE](payload);
          handleResponse(response, true);
          break;

        case SERVICE?.BULK_RETRIEVE:
        default: {
          response = await services[SERVICE?.BULK_RETRIEVE](payload);
          handleResponse(response, true);
          break;
        }
      }
      overwrite && setRequestStack((state) => ({ ...state, [type]: request }));
      return handleResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  // Retry previous request using a new or the previous payload
  const dispatchRetry = (payload) =>
    requestStack ? dispatchRequest(requestStack[lastRequestType]) : null;

  useEffect(() => {
    console.log('Services registered', services)
  })
  return {
    data,
    error,
    prevRequest: requestStack,
    isFetching,
    dispatchRetry,
    dispatchRequest,
  };
}

function noService(type) {
  let message = `No **${type}** service specified`;
  throw new Error(message);
}

useService.displayName = "useServiceHook";
export default useService;
