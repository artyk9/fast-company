import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import api from '../../../api';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import _ from 'lodash';
import Loader from '../../common/loader';
import SearchBar from '../../searchBar';

const pageSize = 8;

const UsersListPage = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [professions, setProfessions] = useState();
   const [selectedProf, setSelectedProf] = useState();
   const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
   const [users, setUsers] = useState();
   const [searchString, setSearchString] = useState('');

   useEffect(() => {
      api.users.fetchAll().then((data) => setUsers(data));
      api.professions.fetchAll().then((data) => setProfessions(data));
   }, []);

   const handleDelete = (userId) => {
      setUsers(users.filter((user) => user._id !== userId));
   };

   const handleToggleBookmark = (userId) => {
      const newUsersState = users.map((user) => {
         if (user._id === userId) user.bookmark = !user.bookmark;
         return user;
      });
      setUsers(newUsersState);
   };

   useEffect(() => {
      setCurrentPage(1);
   }, [selectedProf]);

   const handleProfessionSelect = (item) => {
      setSelectedProf(item);
   };

   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };

   const handleSort = (item) => {
      setSortBy(item);
   };

   const handleSearch = (string) => {
      setSearchString(string);
   };

   if (users) {
      const filteredUser = selectedProf
         ? users.filter((user) => {
              return (
                 JSON.stringify(user.profession) ===
                 JSON.stringify(selectedProf)
              );
           })
         : users;

      const count = filteredUser.length;

      const setPage = Math.ceil(count / pageSize);
      if (currentPage > setPage) {
         setCurrentPage(setPage);
      }
      const sortedUsers = _.orderBy(filteredUser, sortBy.path, sortBy.order);
      const usersCrop = paginate(sortedUsers, currentPage, pageSize);

      const clearFilter = () => {
         setSelectedProf();
      };

      return (
         <div className="d-flex">
            {professions && (
               <div className="d-flex flex-column flex-shrink-0 p-3">
                  <GroupList
                     selectedItem={selectedProf}
                     items={professions}
                     onItemSelect={handleProfessionSelect}
                     valueProperty={'_id'}
                     contentPropety="name"
                  />
                  <button
                     className="btn btn-secondary mt-2"
                     onClick={clearFilter}
                  >
                     Очистить
                  </button>
               </div>
            )}
            <div className="d-flex flex-column">
               <SearchStatus length={count} />
               <SearchBar onSearch={handleSearch} value={searchString} />
               {count > 0 && (
                  <UsersTable
                     users={usersCrop}
                     onSort={handleSort}
                     selectedSort={sortBy}
                     onDelete={handleDelete}
                     onToggleBookmark={handleToggleBookmark}
                  />
               )}
               <div className="d-flex justify-content-center">
                  <Pagination
                     itemsCount={count}
                     pageSize={pageSize}
                     currentPage={currentPage}
                     onPageChange={handlePageChange}
                  />
               </div>
            </div>
         </div>
      );
   }
   return <Loader />;
};
UsersListPage.propTypes = {
   users: PropTypes.array
};

export default UsersListPage;
