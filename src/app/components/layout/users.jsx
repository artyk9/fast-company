import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../page/usersListPage/usersListPage';
import UserPage from '../page/userPage/userPage';

const Users = () => {
   const { userId } = useParams();
   return userId ? <UserPage id={userId} /> : <UsersListPage />;
};

export default Users;
