import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../recoil/atoms/user';
import UserModal from '../../user/modals/auth/Auth';
import UserEvents from '../../user/modals/events/UserEvents';

const Header: React.FC = ({}) => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <header className="app-header">
      <h2 data-test="header-logo">Awesome Meetups</h2>
      {!user.token && <UserModal />}
      {user.token && <UserEvents />}
    </header>
  );
};

export default Header;
