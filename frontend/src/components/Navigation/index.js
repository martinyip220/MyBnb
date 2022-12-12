import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-buttons'>
      <li>
        <NavLink exact to="/">
          <img src="https://imgur.com/mvwBirr" alt='MyBnB logo'></img>
        </NavLink>
      </li>
      {isLoaded && (
        <li className='profile-button'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
