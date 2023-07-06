/**
 *
 * Application
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import actions from '../../actions';
import Footer from '../../components/Common/Footer';
import Page404 from '../../components/Common/Page404';
import { CART_ITEMS } from '../../constants';
import Authentication from '../Authentication';
import AuthSuccess from '../AuthSuccess';
import BrandsPage from '../BrandsPage';
import Contact from '../Contact';
import Dashboard from '../Dashboard';
import ForgotPassword from '../ForgotPassword';
import HomePage from '../Homepage';
// routes
import Login from '../Login';
import MerchantSignup from '../MerchantSignup';
import Navigation from '../Navigation';
import Notification from '../Notification';
import OrderPage from '../OrderPage';
import OrderSuccess from '../OrderSuccess';
import ProductPage from '../ProductPage';
import ResetPassword from '../ResetPassword';
import Sell from '../Sell';
import Shop from '../Shop';
import Signup from '../Signup';
import Support from '../Support';

class Application extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleStorage = this.handleStorage.bind(this);
  }
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.fetchProfile();
    }

    this.props.handleCart();

    document.addEventListener('keydown', this.handleTabbing);
    document.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('storage', this.handleStorage);
  }

  handleStorage(e) {
    if (e.key === CART_ITEMS) {
      this.props.handleCart();
    }
  }

  handleTabbing(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing');
    }
  }

  handleMouseDown() {
    document.body.classList.remove('user-is-tabbing');
  }

  render() {
    return (
      <div className='application'>
        <Notification />
        <Navigation />
        <main className='main'>
          <Container fluid>
            <div className='wrapper'>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={Shop} />
                <Route path='/sell' component={Sell} />
                <Route path='/contact' component={Contact} />
                <Route path='/brands' component={BrandsPage} />
                <Route path='/product/:slug' component={ProductPage} />
                <Route path='/order/success/:id' component={OrderSuccess} />
                <Route path='/order/:id' component={OrderPage} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Signup} />
                <Route
                  path='/merchant-signup/:token'
                  component={MerchantSignup}
                />
                <Route path='/forgot-password' component={ForgotPassword} />
                <Route
                  path='/reset-password/:token'
                  component={ResetPassword}
                />
                <Route path='/auth/success' component={AuthSuccess} />
                <Route path='/support' component={Authentication(Support)} />
                <Route
                  path='/dashboard'
                  component={Authentication(Dashboard)}
                />
                <Route path='/404' component={Page404} />
                <Route path='*' component={Page404} />
              </Switch>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    products: state.product.storeProducts
  };
};

export default connect(mapStateToProps, actions)(Application);
