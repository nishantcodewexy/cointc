import { useEffect } from "react";

const useScript = (url, props = { async: true }) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    for (let p in props) {
      script[p] = props[p];
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
