import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
   items,
   valueProperty,
   contentPropety,
   onItemSelect,
   selectedItem
}) => {
   return (
      <ul className="list-group">
         {Object.keys(items).map((key) => (
            <li
               key={items[key][valueProperty]}
               className={`list-group-item ${
                  items[key] === selectedItem ? 'active' : ''
               }`}
               onClick={() => {
                  onItemSelect(items[key]);
               }}
               role="button"
            >
               {items[key][contentPropety]}
            </li>
         ))}
      </ul>
   );
};
GroupList.defaultProps = {
   valueProperty: '_id',
   contentPropety: 'name'
};
GroupList.propTypes = {
   items: PropTypes.array.isRequired,
   valueProperty: PropTypes.string.isRequired,
   contentPropety: PropTypes.string.isRequired,
   onItemSelect: PropTypes.func,
   selectedItem: PropTypes.object
};

export default GroupList;
