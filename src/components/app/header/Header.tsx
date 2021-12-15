import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../recoil/atoms/user';
import UserModal from '../../user/modals/UserModal';

const Header: React.FC = ({}) => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <header className="app-header">
      <h2 data-test="header-logo">Awesome Meetups</h2>
      {!user.token && <UserModal />}
    </header>
  );
};

export default Header;
