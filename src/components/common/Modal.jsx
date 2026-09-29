import { useEffect } from "react";
import { X } from "lucide-react";
import "./Modal.css";

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title ? (
          <div className="modal-header">
            <h3>{title}</h3>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <button
            className="modal-close modal-close--floating"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
