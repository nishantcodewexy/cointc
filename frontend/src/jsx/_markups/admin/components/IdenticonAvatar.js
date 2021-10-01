import { useState, useRef, useEffect } from "react";
const identicon = require("identicon");

function IdenticonAvatar({ id = "stranger", width, height }) {
  const [buffer, setBuffer] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    try {
      identicon.generate({ id, size: 150 }, (err, buffer) => {
        if (err) throw err;
        imgRef.current.src = buffer;
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <img ref={imgRef} src={buffer} alt="" />
    </>
  );
}

export default IdenticonAvatar;
