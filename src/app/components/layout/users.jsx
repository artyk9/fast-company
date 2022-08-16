import React from 'react';
import { useParams } from 'react-router-dom';
import UsersList from '../users';
import UserPage from '../userPage';

const Users = () => {
   const { userId } = useParams();
   return userId ? <UserPage id={userId} /> : <UsersList />;
};

export default Users;
