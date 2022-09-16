import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../page/usersListPage/usersListPage';
import UserPage from '../page/userPage/userPage';
import EditUserPage from '../page/editUserPage/editUserPage';

const Users = () => {
   const { userId, edit } = useParams();
   if (!userId) {
      return <UsersListPage />;
   } else if (edit === 'edit') {
      return <EditUserPage id={userId} />;
   } else {
      return <UserPage id={userId} />;
   }
};

export default Users;
