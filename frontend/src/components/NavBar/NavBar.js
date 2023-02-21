import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.scss';
import { logout } from '../../store/session';
import AuthModal from '../Auth/AuthModal';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/reservations/new'}>Create a New Reservation</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <AuthModal />
      );
    }
  }

  return (
    <>
      <h1>Reservations</h1>
      <Link to={'/reservations'}>All Available Reservations</Link>
      <Link to={'/profile'}>Profile</Link>
      { getLinks() }
    </>
  );
}

export default NavBar;
