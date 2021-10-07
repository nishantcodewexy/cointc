import { Row, Col, Modal } from "react-bootstrap";

export function ModalForm({
  useFormRenderer,
  formData,  
  isOpen,
  onClose,
}) {
  const [title, form] = useFormRenderer(formData);

  return (
    <>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{form}</Modal.Body>
      </Modal>
    </>
  );
}


