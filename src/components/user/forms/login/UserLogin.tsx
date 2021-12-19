import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Input, { Props as IInput } from '../../../input/Input';
import { userState } from '../../../../recoil/atoms/user';
import { repoFactory } from '../../../../repositories';
import './login.styles.scss';

const UserLogin: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const loginUser = async () => {
    const userRepository = repoFactory('userRepository');
    const { username, password } = loginCredentials;
    const response = await userRepository.loginUser(username, password);
    if (response) {
      setUser({ ...user, token: response.data.token });
    }
  };

  const [disableBtn, setDisableBtn] = useState<boolean>(true);

  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });

  useEffect(() => {
    const isCredentialsEmpty = () => Object.values(loginCredentials).some((value) => value === '');
    if (!isCredentialsEmpty() && disableBtn) {
      setDisableBtn(false);
    } else if (isCredentialsEmpty() && !disableBtn) {
      setDisableBtn(true);
    }
  }, [loginCredentials, disableBtn]);

  const onInputChange: IInput['onChangeHandler'] = (e) => {
    const target = e.target;
    setLoginCredentials({ ...loginCredentials, [target.name]: target.value });
  };
  const inputs: IInput[] = [
    {
      inputName: 'username',
      inputType: 'text',
      label: 'Username',
      placeholder: 'enter your username',
      onChangeHandler: onInputChange,
    },
    {
      inputName: 'password',
      inputType: 'password',
      label: 'Password',
      placeholder: 'enter your password',
      onChangeHandler: onInputChange,
    },
  ];
  return (
    <article className="user-login fade-in-animation" data-test="user-login">
      {inputs.map((input, index) => (
        <Input {...input} key={index} />
      ))}
      <div className="user-login__cta">
        <button className="user-login__cta__login-btn" onClick={loginUser} disabled={disableBtn} data-test="login-btn">
          Login
        </button>
      </div>
    </article>
  );
};

export default UserLogin;
