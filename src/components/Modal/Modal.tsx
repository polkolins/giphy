import { memo, MouseEvent, ReactElement, useRef } from "react";

import cls from "./Modal.module.sass";


export interface IProps {
  isOpen: boolean,
  onClose: (isOpen: boolean, children: ReactElement | null) => void,
  children: ReactElement | null
}

const Modal = memo(({ isOpen, onClose, children }: IProps) => {
  const modalContainerRef = useRef(null);

  if (!isOpen) {
    return null
  }

  const closeHandler = (event: MouseEvent) => {
    if (event.target === modalContainerRef.current) {
      onClose(false, null);
    }
  }

  return (
    <div className={cls.modal} data-testid="modal">
      <div className={cls.backdrop}/>

      <div
        ref={modalContainerRef}
        className={cls.modalContainer}
        onClick={closeHandler}
        data-testid="modal-container"
      >
        <div className={cls.modalContent}>
          {children}
        </div>
      </div>
    </div>
  )
});

export default Modal;