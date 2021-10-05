import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "../_constants";

const { NOTICE } = constants;
// debugger;
const useService = function (service) {
  const [data, setData] = useState(null);
  const [error /* setError */] = useState(null);
  const dispatch = useDispatch();

  function prefetch() {}
  function postfetch() {}
  async function fetch() {
    console.log("SERVICE HOOK::FETCH");
    // let { success, error } = await service();
    setData(1);
    setData(2);
    setData(3);
    // success ? setData(success) : setError(error);
  }
  function refetch() {}
  // fetch();
  // dispatch({ type: NOTICE.INFO, data: "JUST CHECKING" });
  return {
    data,
    error,
    prefetch,
    postfetch,
    fetch,
    refetch,
  };
};

export default useService;
