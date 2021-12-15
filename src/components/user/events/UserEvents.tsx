import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../recoil/atoms/user';
import UsersRepository from '../../../repositories/users';
import EventList from './list/EventList';

const UserSettings: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const getEvents = async () => {
      const userRepo = new UsersRepository();
      const { token } = user;
      if (token) {
        const response = await userRepo.getUserEvents(token);
        if (response) {
          setUser({ ...user, attendingEvents: [...response.data] });
        }
      }
    };
    getEvents();
  }, []);
  return (
    <section className="user-events" data-test="user-events">
      <EventList />
    </section>
  );
};

export default UserSettings;
