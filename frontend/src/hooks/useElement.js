import { useEffect } from "react";

const useElement = (_elem, _props = {}, _parent, _ref) => {
  useEffect(() => {
    try {
      const elem = document.createElement(_elem);

      for (let p in _props) {
        elem[p] = _props[p];
      }

      document[_parent].appendChild(elem);

      return () => {
        document[_parent].removeChild(elem);
      };
    } catch (error) {
      console.error(error);
    }
  }, [_elem, _props, _parent]);
};

export default useElement;
