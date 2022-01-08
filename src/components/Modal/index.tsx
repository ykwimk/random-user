import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalWrapper } from './Modal.style';

interface ModalPropsType {
  children: React.ReactNode;
  onClickClose: () => void;
}

const Modal = ({ children, onClickClose }: ModalPropsType) => {
  return (
    <ModalWrapper>
      <div className="modal-container">
        <div className="modal-header">
          <button
            type="button"
            className="modal-close-button"
            onClick={onClickClose}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="modal-contents">{children}</div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
