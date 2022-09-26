import { Tag, Button } from 'antd';
import PropTypes from "prop-types";
import React from 'react'


class MyTag extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.number,
    checked: PropTypes.bool
  };

  static defaultProps = {
    onChange: () => { },
    value: "",
    checked: false
  };


  handleChange = () => {
    this.props.onChange(this.props.value)
  };

  render() {
    const { onChange, value, ...rest } = this.props
    return (
      <Button type={this.props.checked ? "primary" : "default"} style={{ fontSize: "12px" }} className="mr-1 mb-1" onClick={this.handleChange}>{this.props.children}</Button>
    );
  }
}

export default MyTag;

