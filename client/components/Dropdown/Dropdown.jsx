import React, { PropTypes } from 'react';

const Dropdown = ({ items, onChange }) => {
  const options = items.map((item) => (
    <option key={item.value} value={item.value}>{item.text}</option>)
  );

  return (
    <select onChange={onChange}>
      <option value=""></option>
      {options}
    </select>
  );
};

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Dropdown;
