import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from '../Tab';

import { ListTabs } from './styles';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.defaultActiveIndex || 0,
    };
  }

  handleTabClick = tabIndex => {
    const { activeIndex } = this.state;
    if (tabIndex !== activeIndex) {
      this.setState({
        activeIndex: tabIndex,
      });
    }
  };

  cloneTabElement = (tab, index = 0) => {
    const { activeIndex } = this.state;
    return React.cloneElement(tab, {
      onClick: () => this.handleTabClick(index),
      tabIndex: index,
      isActive: index === activeIndex,
    });
  };

  renderChildrenTabs = () => {
    const { children } = this.props;

    if (!Array.isArray(children)) {
      return this.cloneTabElement(children);
    }

    return children.map(this.cloneTabElement);
  };

  renderActiveTabContent = () => {
    const { children } = this.props;
    const { activeIndex } = this.state;

    if (children[activeIndex]) {
      return children[activeIndex].props.children;
    }

    return children.props.children;
  };

  render() {
    return (
      <section>
        <ListTabs>{this.renderChildrenTabs()}</ListTabs>
        <div>{this.renderActiveTabContent()}</div>
      </section>
    );
  }
}

Tabs.propTypes = {
  defaultActiveIndex: PropTypes.number.isRequired,
  children: PropTypes.shape({ props: PropTypes.shape(), map: PropTypes.func })
    .isRequired,
};

Tabs.Tab = Tab;

export default Tabs;
