import { useEffect } from "react";

const useScript = (props) => {
  useEffect(() => {
    const script = document.createElement("script");

    for (let p in props) {
      script[p] = props[p];
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [props]);
};

export default useScript;
