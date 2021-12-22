import React, { useState } from 'react';
import './baseModal.styles.scss';
export interface Props {
  visible: boolean;
  closeModal: CallableFunction;
  modalRef: string | number;
  title?: string;
}
type Animate = 'in' | 'out';
const BaseModal: React.FC<Props> = ({ visible, closeModal, modalRef, children, title }) => {
  const [animate, setAnimate] = useState<Animate>('in');
  const onCloseHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('outer-modal')) {
      setAnimate('out');
      setTimeout(() => {
        closeModal(modalRef);
        setAnimate('in');
      }, 500);
    }
  };
  return visible ? (
    <section className={`outer-modal`} data-test="outer-modal" onClick={onCloseHandler}>
      <div className="modal-wrapper">
        <div
          className={`inner-modal-close ${animate === 'in' ? 'slide-in-right-animation' : 'slide-out-left-animation'}`}
        >
          {title && <h2>{title}</h2>}
          <i
            className="ri-arrow-left-fill icon "
            data-test="icon-close"
            onClick={() => {
              setAnimate('out');

              setTimeout(() => {
                closeModal(modalRef);
                setAnimate('in');
              }, 500);
            }}
          ></i>
        </div>
        <div className={`animation-frame ${animate === 'in' ? 'scale-in-animation' : 'scale-out-animation'}  `}>
          {children}
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default BaseModal;
