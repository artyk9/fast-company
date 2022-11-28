import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditUserPage from '../components/page/editUserPage';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import { getCurrentUserId } from '../store/users';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
   const params = useParams();
   const { userId, edit } = params;
   const currentUserId = useSelector(getCurrentUserId());
   return (
      <>
         <UsersLoader>
            {userId ? (
               edit ? (
                  userId === currentUserId._id ? (
                     <EditUserPage />
                  ) : (
                     <Redirect to={`/users/${currentUserId._id}/edit`} />
                  )
               ) : (
                  <UserPage userId={userId} />
               )
            ) : (
               <UsersListPage />
            )}
         </UsersLoader>
      </>
   );
};

export default Users;
