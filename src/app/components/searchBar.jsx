import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, value }) => {
   const handleChange = ({ target }) => onSearch(String(target.value));
   return (
      <div className="input-group mt-2">
         <span
            className="input-group-text bi bi-search bg-white"
            id="basic-addon1"
         ></span>
         <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={handleChange}
            value={value}
         />
      </div>
   );
};
SearchBar.propTypes = {
   onSearch: PropTypes.func.isRequired,
   value: PropTypes.string
};

export default SearchBar;
