import { Modal } from "./Modal";
import { Button } from "./Button";
import "./ConfirmDialogue.css";

export function ConfirmDialogue({
  isOpen,
  onConfirm,
  title = "Are you sure?",
  onClose,
  message,
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="dialogue-modal--wrapper">
      <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <p className="confirm-dialogue--message">{message}</p>
        <div className="confirm-dialogue--actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
