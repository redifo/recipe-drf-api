import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/img/logo-removebg.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    // Simulated authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to='/'>
                <Navbar.Brand ><img src={logo} alt="logo" height="75" />Recipe Domain</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                        <NavLink className={ styles.NavLink } to='/' exact activeClassName= { styles.Active } ><i className="fas fa-home"></i>Home</NavLink>
                        <NavLink className={ styles.NavLink } to='/recipes' activeClassName= { styles.Active } >Recipes</NavLink>
                    </Nav>
                    <Nav className='ml-auto'>
                        {
                            isLoggedIn ? (
                                <>
                                    <NavDropdown title={<span><i className="fa-solid fa-user"></i> Account</span>} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={NavLink} activeClassName= { styles.Active } to="/profile" >Profile Page</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} activeClassName= { styles.Active } to="/action" >Another action</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} activeClassName= { styles.Active } to="/something" >Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => setIsLoggedIn(false)}> <i class="fa-solid fa-right-from-bracket"></i>Sign Out</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <NavLink className={ styles.NavLink } activeClassName= { styles.Active } to="/signin"><i class="fa-solid fa-right-to-bracket"></i>Login</NavLink>
                                    <NavLink className={ styles.NavLink } activeClassName= { styles.Active } to="/signup"><i class="fa-solid fa-user-plus"></i>Sign Up</NavLink>
                                </>
                            )
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
