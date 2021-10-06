import { useState } from "react";

function useToggler(defaultValue) {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const onOpen = (e) => setIsOpen(true);
  const onClose = (e) => setIsOpen(false);

  return {
    isOpen,
    onOpen,
    onClose,
  };
}

export default useToggler;
