import React, { Component } from 'react';
import Tab from '../Tab';

import { ListTabs } from './styles.js';

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
    const { activeIndex } = this.state;

    return (
      <section>
        <ListTabs>{this.renderChildrenTabs()}</ListTabs>
        <div>{this.renderActiveTabContent()}</div>
      </section>
    );
  }
}

Tabs.Tab = Tab;

export default Tabs;
