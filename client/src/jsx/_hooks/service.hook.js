import _helpers from "../_helpers";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// debugger;
const useService = function (url, method = "get", data = null) {
  let { headers } = _helpers;
  headers = headers();

  const [currentState, updateCurrent] = useState(null);
  //   const session = useSelector((state) => state?.session);

  const config = {
    method,
    headers,
    url,
  };

  switch (method.toLowerCase()) {
    case "post":
    case "put":
    case "delete": {
      config["data"] = data;
      break;
    }
    case "get":
    default: {
      config["params"] = data;
      break;
    }
  }
  // console.log({config});

  async function callService() {
    return await axios(config).catch(console.error);
  }

  console.log(callService());

  return {
    currentState,
  };
};

export default useService;
