import { useState,/*  useEffect */ } from "react";
import { useDispatch } from "react-redux";
import _actions from "../_actions";
import { SERVICE } from "../_constants";
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
function useService(config = {}, toast) {
  const dispatch = useDispatch();

  const [services /* , setServices */] = useState(config);
  const [_fromStack, _toStack] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [_toast, setToast] = useState(toast);

  /**
   * @function handleResponse
   * @param {Object} response
   * @param {Boolean} save
   * @param {Object} toast
   * @param {Function} toast.success
   * @param {Function} toast.error
   * @returns
   */
  async function handleResponse({ response, save = true, toast = false }) {
    let { message, data, error, statusCode } = response;
    // debugger;
    if (error) {
      setError(error);
      toast && message && _toast?.error(message) && _toast?.error(message);
      if (statusCode === 401) {
        dispatch(user.logout());
      }
    } else {
      if (save) {
        setData(data);
      }
      toast && message && _toast?.success && _toast?.success(message);
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
      const {
        type,
        payload = null,
        toast = _toast || false,
        overwrite = true,
        reload = true,
      } = request;

      setIsFetching(true);

      toast && setToast(toast);

      let lowercased = String(type)?.toLowerCase();
      let response = { error: new Error("Response has error") };

      let fn = () => {
        // console.log(lowercased, services)
        throw new Error(
          `<${lowercased}> service does not exist!\nThe value of < ${lowercased} > is < ${services[lowercased]} >`
        );
      };

      if (lowercased in services) {
        fn = services[lowercased]
          ? payload
            ? async () => services[lowercased](payload)
            : async () => services[lowercased]()
          : fn();
      }
      response = await fn();
      overwrite && _toStack((state) => ({ ...state, [lowercased]: request }));

      switch (lowercased) {
        case SERVICE?.RETRIEVE:
        case SERVICE?.BULK_RETRIEVE: {
          return handleResponse({ response, save: true, toast: false });
        }

        default: {
          // reload only if the bulk retrieve service exist
          reload &&
            _fromStack[SERVICE?.BULK_RETRIEVE] &&
            dispatchRequest(_fromStack[SERVICE?.BULK_RETRIEVE]);
          return handleResponse({ response, save: false, toast });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  /**
   * @function addService - Adds a service hook
   * @param {String} type
   * @param {Function} handler
   * @param {*} initialPayload
   */
  /*   function addServiceHook(
    type,
    handler,
    config = {
      payload: null,
      toast: _toast || false,
      overwrite: true,
      reload: true,
    }
  ) {
    try {      
      setServices((state) => ({
        ...state,
        [type]: ()=>handler,
      }));
      return {
        type,
        ...config,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  } */

  /**
   * @function dispatchRetry - Retry previous request using a new or the previous payload
   * @param {Object} payload
   * @returns
   */
  const dispatchRetry = (payload) =>
    _fromStack
      ? dispatchRequest({ ..._fromStack[_fromStack.length - 1], payload })
      : null;

  /* useEffect(() => {
    console.log("Services registered", services);
  }); */

  return {
    data,
    error,
    isFetching,
    dispatchRetry,
    dispatchRequest,
    _fromStack,
  };
}

useService.displayName = "useServiceHook";
export default useService;
