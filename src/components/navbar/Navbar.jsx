import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <nav className="navbar booking-navbar">
                <a className="logo">BOOKING</a>
                <User image={require('../../images/user.png')}/>
            </nav>
        </div>
    )
};

const User = props => {
    return (
        <div className="user-picture">
            <img src={props.image} alt="User"/>
        </div>
    )
};

export default Navbar;
