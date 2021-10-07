import { useState } from "react";

function useToggler(defaultValue) {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const [toggledPayload, setPayload] = useState(null);
  const onOpen = (payload) => {
    setIsOpen(true);
    setPayload(payload);
  };
  const onClose = (payload) => {
    setIsOpen(false);
    setPayload(payload);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    toggledPayload
  };
}

export default useToggler;
