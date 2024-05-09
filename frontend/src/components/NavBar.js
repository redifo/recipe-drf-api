import React, { useRef } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/img/logo-removebg.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';

import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import Notifications from './Notifications';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);

    const { expanded, setExpanded, ref } = useClickOutsideToggle([dropdownRef, notificationRef]);

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();

        } catch (err) {
            console.log("Logout Error:", err);
        }
    };

    const loggedOutIcons = <>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin"><i className="fa-solid fa-right-to-bracket"></i>Login</NavLink>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup"><i className="fa-solid fa-user-plus"></i>Sign Up</NavLink>
    </>

    const loggedInIcons = <>
        <div className={styles.LoggedInIcons}>
            <NavDropdown
                ref={dropdownRef}
                className={`${styles.NavDropdown} pl-2`}
                title={<Avatar src={currentUser?.profile_image} height={60} text={currentUser?.username} />}
                id="basic-nav-dropdown"
            >
                <NavDropdown.Item as={NavLink} activeClassName={styles.Active} to={`/profiles/${currentUser?.profile_id}`}> <i className="fa-solid fa-user"></i> Profile Page</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} activeClassName={styles.Active} to="/profiles/followed"><i className="fa-solid fa-users"></i>Followed Chefs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/" onClick={handleSignOut}>
                    <i className="fa-solid fa-right-from-bracket"></i> Sign Out
                </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
                ref={notificationRef}
                title={<i className="fa-solid fa-bell"></i>}
                id="nav-dropdown-notifications"
            >
                <Notifications currentUser={currentUser} />
            </NavDropdown>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/recipe/create">
                <i className="fa-solid fa-plus fa-2xl"></i>
            </NavLink>
        </div>
    </>

    return (
        <Navbar expanded={expanded} className={styles.NavBar} expand="lg" fixed='top'>
            <Container fluid className={styles.Container}>
                <NavLink to='/'>
                    <Navbar.Brand ><img src={logo} alt="logo" height="75" />Recipe Domain</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                        <NavLink className={styles.NavLink} to='/' exact activeClassName={styles.Active} ><i className="fas fa-home"></i>Home</NavLink>
                        <NavLink className={styles.NavLink} to='/recipes' activeClassName={styles.Active} ><i className="fa-solid fa-utensils"></i> Recipes</NavLink>
                    </Nav>
                    <Nav className='ml-auto'>
                        {
                            currentUser ? (
                                loggedInIcons
                            ) : (
                                loggedOutIcons
                            )
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
