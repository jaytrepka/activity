import React, { Component } from "react";
import { connect } from "react-redux";
import MenuIcon from "../../icons/Menu";

import "./style.css";

class ErrorComponent extends Component {
  render() {
    const {
      error,
      isError,
    } = this.props;

    return (
      <div className="error-wrapper">
        {isError && <div className="error">
        <MenuIcon />
        <span>{error || 'Something went wrong'}</span>
        </div>}
      </div>
    );
  }
}
const mapStateToProps = ({ general: { error, isError } }) => {
  return {
    error,
    isError,
  };
};
export default connect(mapStateToProps)(ErrorComponent);
