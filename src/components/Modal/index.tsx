import React, { useCallback, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalWrapper } from './Modal.style';

interface ModalPropsType {
  children: React.ReactNode;
  onClickClose: () => void;
}

const Modal = ({ children, onClickClose }: ModalPropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(
    (e: { target: any; currentTarget: any }) => {
      if (ref.current && !ref.current?.contains(e.target)) {
        onClickClose();
      }
    },
    [onClickClose],
  );

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [onClickOutside]);

  useEffect(() => {
    window.document.body.style.overflow = 'hidden';
    return () => {
      window.document.body.style.overflow = '';
    };
  }, []);

  return (
    <ModalWrapper>
      <div ref={ref} className="modal-container">
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
