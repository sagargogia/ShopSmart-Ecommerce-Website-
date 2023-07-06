/**
 *
 * AuthSuccess
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import actions from '../../actions';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import setToken from '../../utils/token';

class AuthSuccess extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('token');
    setToken(token);
  }

  render() {
    const { authenticated } = this.props;

    if (authenticated) return <Redirect to='/shop' />;

    return <LoadingIndicator />;
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(AuthSuccess);
