import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../page/usersListPage/usersListPage';
import UserPage from '../page/userPage/userPage';
import EditUserPage from '../page/editUserPage/editUserPage';

const Users = () => {
   const params = useParams();
   const { userId, edit } = params;
   return (
      <>
         {userId ? (
            edit ? (
               <EditUserPage />
            ) : (
               <UserPage userId={userId} />
            )
         ) : (
            <UsersListPage />
         )}
      </>
   );
};

export default Users;
