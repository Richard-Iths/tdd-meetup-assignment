import React from 'react';
import './baseModal.styles.scss';
export interface Props {
  visible: boolean;
  closeModal: CallableFunction;
  modalRef: string | number;
}
const BaseModal: React.FC<Props> = ({ visible, closeModal, modalRef, children }) => {
  const onCloseHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('outer-modal')) {
      closeModal(modalRef);
    }
  };
  return visible ? (
    <section className="outer-modal" data-test="outer-modal" onClick={onCloseHandler}>
      <div className="modal-wrapper">
        <div className="inner-modal-close">
          <i
            className="ri-close-circle-fill icon icon-wrapper--primary-light"
            data-test="icon-close"
            onClick={() => closeModal(modalRef)}
          ></i>
        </div>
        {children}
      </div>
    </section>
  ) : (
    <></>
  );
};

export default BaseModal;
