import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// set the prop types from predefined shapes or standard types
const propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

// set the defaults
const defaultProps = {
  collapsed: true,
  title: 'Title',
  subtitle: 'Subtitle'
};

// define the class
class Pane extends Component {

  // init
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed
    }
    this.handleCollapseClick = this.handleCollapseClick.bind(this);
    this.collapse = this.collapse.bind(this);
    this.uncollapse = this.uncollapse.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.renderCollapseButton = this.renderCollapseButton.bind(this);
  }

  // called to collapse the pane
  collapse() {
    this.setState({
      collapsed: true
    });
  }

  // called to uncollapse the pane
  uncollapse() {
    this.setState({
      collapsed: false
    });
  }

  // force a collapse event
  componentWillReceiveProps(nextProps) {
    if (nextProps.collapsed) {
      this.collapse();
    } else {
      this.uncollapse();
    }
  }

  // click the collapse button
  handleCollapseClick(event) {
    if (this.props.onCollapse) return this.props.onCollapse(event, this.props);

    // continue with the standard functionality
    if (this.state.collapsed) return this.uncollapse();
    return this.collapse()
  }

  // only render children if not collapsed
  renderChildren() {
    if (!this.state.collapsed) {
      return this.props.children;
    }
  }

  // render the collapse button differently based on the state
  renderCollapseButton() {
    var iconClassName;

    if (this.state.collapsed) {
      iconClassName = ['far','folder'];
    } else {
      iconClassName = 'times';
    }

    return (
      <Button className="collapse" aria-label="Collapse Pane">
        <FontAwesomeIcon icon={iconClassName} />
      </Button>
    );
  }

  // main render method
  render() {
    const className = classNames({
      'pane': true,
      collapsed: this.state.collapsed
    });

    return (
      <div className={className}>
        <div className="pane-header" onClick={this.handleCollapseClick}>
          <div className="fx-grd">
            <div className="col-4">
              <Typography color="inherit" className="pane-title">{this.props.title}</Typography>
            </div>
            <div className="col-3">
              <div className="fx-grd flex-end">
                <div className="col-7">
                  <Typography color="inherit" className="pane-subtitle">{this.props.subtitle}</Typography>
                </div>
                <div className="col-buttons">
                  {this.renderCollapseButton()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pane-body">
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

// set the props, defaults and export
Pane.propTypes = propTypes;
Pane.defaultProps = defaultProps;

export default Pane;