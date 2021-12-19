import React, { useState } from 'react';
import BaseModal, { Props as IBaseModal } from '../../../modals/BaseModal';
import UserLogin from '../../forms/login/UserLogin';
import UserRegister from '../../forms/register/UserRegister';
import './auth.styles.scss';

type FormState = 'userLogin' | 'userRegister';
export interface Props extends IBaseModal {}

const AuthModal: React.FC<Props> = ({ visible, closeModal, modalRef }) => {
  const [formState, setFormState] = useState<FormState>('userLogin');
  const changeFormState = (state: FormState) => setFormState(state);
  const handleFormState = (state: FormState): boolean => formState === state;

  return (
    <BaseModal {...{ visible, closeModal, modalRef }}>
      <section className="auth-modal fade-in-animation" data-test="auth-modal">
        {handleFormState('userLogin') && <UserLogin />}
        {handleFormState('userRegister') && <UserRegister />}
        <article className="auth-modal__content">
          {handleFormState('userLogin') && (
            <p className={`auth-modal__text fade-${handleFormState('userLogin') ? 'in' : 'out'}-animation`}>
              Not yet register? click{' '}
              <span className="hyper-link" onClick={() => changeFormState('userRegister')} data-test="link-register">
                Here
              </span>{' '}
              and start explore your interest with other people!
            </p>
          )}

          {handleFormState('userRegister') && (
            <p className={`auth-modal__text fade-${handleFormState('userRegister') ? 'in' : 'out'}-animation`}>
              Already registered? click{' '}
              <span className="hyper-link" onClick={() => changeFormState('userLogin')} data-test="link-login">
                Here
              </span>{' '}
              to login!
            </p>
          )}
        </article>
      </section>
    </BaseModal>
  );
};

export default AuthModal;
