import React, { Component } from "react";
import Alert from "../../icons/Alert";
import { clearError } from '../../actions/general'
import { connect } from "react-redux";

import "./style.css";

class ErrorComponent extends Component {
  render() {
    const {
      error,
      isError,
    } = this.props;

    return (
      <div className="error-wrapper" onClick={() => this.props.clearError()}>
        {isError && <div className="error">
        <Alert />
        <span className="error-message">{error || 'Something went wrong'}</span>
        <div>OK</div>
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
export default connect(mapStateToProps, { clearError })(ErrorComponent);
