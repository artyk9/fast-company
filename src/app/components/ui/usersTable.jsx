import React from 'react';
import Bookmark from '../common/bookmark';
import Qualities from './qualities';
import { Link } from 'react-router-dom';
import Table from '../common/table';
import PropTypes from 'prop-types';

const UsersTable = ({
   users,
   onDelete,
   onSort,
   selectedSort,
   onToggleBookmark
}) => {
   const columns = {
      name: {
         path: 'name',
         name: 'Имя',
         component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
      },
      qualities: {
         name: 'Качества',
         component: (user) => <Qualities qualities={user.qualities} />
      },
      profession: { path: 'profession.name', name: 'Профессия' },
      completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
      rate: { path: 'rate', name: 'Оценка' },
      bookmark: {
         path: 'bookmark',
         name: 'Избранное',
         component: (user) => (
            <Bookmark
               {...{
                  bookmark: user.bookmark,
                  _id: user._id,
                  onToggleBookmark
               }}
            />
         )
      },
      delete: {
         component: (user) => (
            <button
               type="button"
               className="btn btn-danger btn-sm"
               onClick={() => onDelete(user._id)}
            >
               Delete
            </button>
         )
      }
   };
   return (
      <Table
         {...{
            onSort,
            selectedSort,
            columns,
            data: users
         }}
      />
   );
};
UsersTable.propTypes = {
   users: PropTypes.array.isRequired,
   onSort: PropTypes.func.isRequired,
   selectedSort: PropTypes.object.isRequired,
   onToggleBookmark: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired
};

export default UsersTable;
