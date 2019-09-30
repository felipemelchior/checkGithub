import React from 'react';
import PropTypes from 'prop-types';
import { TabItem } from './styles';

function Tab({ label, isActive, onClick }) {
  return (
    <TabItem isActive={isActive}>
      <button type="button" onClick={onClick}>
        {label}
      </button>
    </TabItem>
  );
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
