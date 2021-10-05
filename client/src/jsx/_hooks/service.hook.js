import { useState, useEffect } from "react";

function useService(service) {
  const [reload, dispatchReload] = useState(false);
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetcher = async () => {
    // Only reload once
    if (reload) {
      dispatchReload(false);
      return;
    }
    setIsFetching(true);
    let { success, failure } = await service();
    success ? setData(success) : setError(failure);
    setIsFetching(false);
  };

  // Fetch on mount and watch for subsequent reloads requests
  useEffect(() => {
    fetcher();
  }, [reload]);

  return {
    data,
    error,
    isFetching,
    dispatchReload,
  };
}
export default useService;
