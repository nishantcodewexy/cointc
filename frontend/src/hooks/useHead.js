import { useEffect } from "react";

const useLink = (_elem, _props = {}, _ref) => {
  useEffect(() => {
    let elem;
    if (_ref) elem = _ref;
    else elem = document.createElement(_elem);

    for (let p in _props) {
      elem[p] = _props[p];
    }
    document.querySelector('head').appendChild(link);

    return () => {
      document.body.removeChild(link);
    };
  }, [url]);
};

export default useLink;
