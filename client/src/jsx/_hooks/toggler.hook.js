import { useState } from "react";

function useToggler(defaultValue) {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    onOpen,
    onClose,
  };
}

export default useToggler;
