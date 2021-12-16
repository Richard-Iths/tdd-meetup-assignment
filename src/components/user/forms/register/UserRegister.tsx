import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../recoil/atoms/user';
import UsersRepository from '../../../../repositories/users';
import Input, { Props as IInput } from '../../../input/Input';

const UserRegister: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  const registerUser = async () => {
    const userRepository = new UsersRepository();
    const { email, password } = registerCredentials;

    const response = await userRepository.registerUser(email, password);
    if (response) {
      setUser({ ...user, token: response.data.token });
    }
  };
  const [registerCredentials, setRegisterCredentials] = useState({ email: '', password: '' });

  const [disableBtn, setDisableBtn] = useState<boolean>(true);

  useEffect(() => {
    const isCredentialsEmpty = () => Object.values(registerCredentials).some((value) => value === '');
    if (!isCredentialsEmpty() && disableBtn) {
      setDisableBtn(false);
    } else if (isCredentialsEmpty() && !disableBtn) {
      setDisableBtn(true);
    }
  }, [registerCredentials, disableBtn]);

  const onInputChange: IInput['onChangeHandler'] = (e) => {
    const target = e.target;
    setRegisterCredentials({ ...registerCredentials, [target.name]: target.value });
  };

  const inputs: IInput[] = [
    {
      inputName: 'email',
      inputType: 'text',
      label: 'Email',
      placeholder: 'Enter your email',
      onChangeHandler: onInputChange,
    },
    {
      inputName: 'password',
      inputType: 'text',
      label: 'Password',
      placeholder: 'Enter your password',
      onChangeHandler: onInputChange,
    },
  ];
  return (
    <article className="user-register" data-test="user-register">
      {inputs.map((input, index) => (
        <Input {...input} key={index} />
      ))}
      <div className="user-register__cta">
        <button
          className="user-register__cta__register-btn"
          onClick={registerUser}
          disabled={disableBtn}
          data-test="btn-register"
        >
          Register
        </button>
      </div>
    </article>
  );
};

export default UserRegister;
