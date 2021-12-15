import React, { useState } from 'react';
import UserLogin from '../forms/login/UserLogin';
import UserRegister from '../forms/register/UserRegister';

type FormState = 'userLogin' | 'userRegister';

const UserModal: React.FC = () => {
  const [formState, setFormState] = useState<FormState>('userLogin');
  const changeFormState = (state: FormState) => setFormState(state);
  const handleFormState = (state: FormState): boolean => formState === state;
  return (
    <section className="user-modal">
      {handleFormState('userLogin') && <UserLogin />}
      {handleFormState('userRegister') && <UserRegister />}
      <article className="user-modal__content">
        {handleFormState('userLogin') && (
          <p className="user-modal__text">
            Not yet register? click{' '}
            <span className="hyper-link" onClick={() => changeFormState('userRegister')} data-test="link-register">
              Here
            </span>{' '}
            and start explore your interest with other people!
          </p>
        )}

        {handleFormState('userRegister') && (
          <p className="user-modal__text">
            Already registered? click{' '}
            <span className="hyper-link" onClick={() => changeFormState('userLogin')} data-test="link-login">
              Here
            </span>{' '}
            to login!
          </p>
        )}
      </article>
    </section>
  );
};

export default UserModal;
