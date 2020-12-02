// react
import React, { useState, Fragment } from "react";
// redux
import { connect } from "react-redux";
import { setSocketAction, setUserAction } from "../actions";
// router dom
import {
    Link, 
    useHistory,
    useLocation
} from 'react-router-dom';
// reactstrap
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
// services
import { logoutPost } from "../services/api";

/* ******************************************************** COMPONENT ********************************************************* */
function Navigation(props) {
    /* *********************************************************** REFERENCES ********************************************************* */
    const toggleNavbarRef = React.createRef();
    const toggleMenuIconRef = React.createRef();

    /* *********************************************************** STATES ********************************************************* */
    const initialState = {
        collapsed: true,
    };
    const [state, setState] = useState(initialState);

    /* *********************************************************** LOGOUT ********************************************************* */
    const history = useHistory();

    const logoutBtnClick = (e) => {
        e.preventDefault();
        logoutPost().then(data => {
            if (data === 10) {
                // props.socket.disconnect();
                // props.setSocketAction(null);
                props.setUserAction(null);
                history.push('/login');
            }
        }).catch(err => {
            console.log(err);
        });
        toggleNavbar();
    };
    
/* *********************************************************** TOGGLES ********************************************************* */
    const toggleNavbar = () => {
        setState({...state, collapsed: !state.collapsed});
        toggleNavbarRef.current.classList.toggle('active');
        toggleMenuIconRef.current.classList.toggle('open');
    };

    const toggleNavbarBlur = e => {
        // console.log(e.relatedTarget);
        if(e.relatedTarget === null){
            setState({...state, collapsed: true});
            toggleMenuIconRef.current.classList.remove('open');
        }
    }

/* *********************************************************** RETURN ********************************************************* */      
    let location = useLocation();

    const navItemsElement = (
        <Fragment>
            <NavItem active={location.pathname === '/' ? true : false}>
                <NavLink title="home" onClick={toggleNavbar} tag={Link} to="/">home</NavLink>
            </NavItem>
            {props.user ? (
                <Fragment>
                    <NavItem active={location.pathname === '/user/dashboard' ? true : false}>
                        <NavLink title="dashboard" onClick={toggleNavbar} tag={Link} to="/user/dashboard">dashboard</NavLink>
                    </NavItem>
                    <NavItem active={location.pathname === '/user/profile' ? true : false}>
                        <NavLink title="profile" onClick={toggleNavbar}  tag={Link} to="/user/profile">profile</NavLink>
                    </NavItem>
            {props.user.role === "admin" ? (
                    <NavItem>
                        <NavLink
                            tag={Link}
                            to="/user/adminPanel"
                        >
                            Panel
                        </NavLink>
                    </NavItem>
            ) : (
                ""
            )}
            {props.user.role === "subadmin" ? (
                    <NavItem>
                        <NavLink
                            tag={Link}
                            to="/user/subadminPanel"
                        >
                            Panel
                        </NavLink>
                    </NavItem>
            ) : (
                ""
            )}
                    <NavItem>
                        <NavLink title="logout" href="#" onClick={logoutBtnClick}>logout</NavLink>
                    </NavItem>
                </Fragment>
            ) : (
                <Fragment>
                    <NavItem active={location.pathname === '/login' ? true : false}>
                        <NavLink title="login" onClick={toggleNavbar} tag={Link} to="/login">login</NavLink>
                    </NavItem>
                    <NavItem active={location.pathname === '/register' ? true : false}>
                        <NavLink title="register" onClick={toggleNavbar} tag={Link} to="/register">register</NavLink>
                    </NavItem>
                </Fragment>
            )}
        </Fragment>
    )
    return (
        <Navbar onBlur={toggleNavbarBlur} fixed="top" className="px-0 justify-content-center">
            <Container  className="mx-sm-5 mx-lg-0 px-5 px-lg-0">

{/* *********************************************************** LOGO ********************************************************* */}
                <div className="flex-grow-1">
                    <NavbarBrand className="m-0" title="home" tag={Link} to="/">
                        {/* <svg version="1.1" className="logo"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px" y="0px" width="653px" height="181px" viewBox="0 0 653 181" enableBackground="new 0 0 653 181">
                            <defs>
                            </defs>
                            <path fill="#9AC992" d="M457.386,54.117c-8.221-7.868-19.855-11.857-34.58-11.857h-29.128c-3.313,0-6,2.687-6,6s2.687,6,6,6h29.128
                                c22.543,0,34.639,11.124,35.061,32.178h-35.061c-0.033,0-0.065,0.004-0.099,0.005c-0.033,0-0.065-0.005-0.099-0.005
                                c-14.725,0-26.359,3.989-34.58,11.857c-8.294,7.938-12.5,19.196-12.5,33.459s4.206,25.521,12.5,33.459
                                c8.221,7.868,19.855,11.857,34.58,11.857h41.277c3.313,0,6-2.687,6-6V92.438v-4.861C469.886,73.313,465.68,62.055,457.386,54.117z
                                M387.528,131.754c0-21.796,12.131-33.316,35.08-33.316c0.033,0,0.065-0.004,0.099-0.005c0.033,0,0.065,0.005,0.099,0.005h35.08
                                v66.633h-35.277C399.659,165.071,387.528,153.55,387.528,131.754z"/>
                            <path fill="#9AC992" d="M246.593,23.99c0-11.046-8.955-20-20-20c-11.047,0-20,8.954-20,20c0,8.955,5.886,16.533,14,19.082v5.142
                                v122.857c0,3.313,2.687,6,6,6s6-2.687,6-6V48.213v-5.142C240.706,40.522,246.593,32.945,246.593,23.99z M226.593,34.479
                                c-5.793,0-10.489-4.696-10.489-10.489S220.8,13.5,226.593,13.5c5.792,0,10.488,4.696,10.488,10.489S232.385,34.479,226.593,34.479z"
                                />
                            <path fill="#9AC992" d="M340.386,54.117c-8.219-7.866-19.85-11.855-34.57-11.857h-0.003l-39.207-0.047h-0.007
                                c-0.207,0-0.412,0.011-0.613,0.031c-0.07,0.007-0.139,0.022-0.209,0.032c-0.129,0.018-0.26,0.033-0.387,0.059
                                c-0.077,0.016-0.15,0.04-0.228,0.059c-0.116,0.029-0.233,0.054-0.348,0.089c-0.031,0.01-0.062,0.024-0.093,0.034
                                c-0.155,0.051-0.309,0.104-0.458,0.167c-0.051,0.021-0.099,0.049-0.149,0.072c-0.126,0.058-0.254,0.115-0.375,0.181
                                c-0.02,0.011-0.037,0.023-0.057,0.034c-0.149,0.083-0.297,0.171-0.438,0.266c-0.011,0.007-0.021,0.016-0.031,0.023
                                c-0.147,0.102-0.292,0.208-0.431,0.322c-0.021,0.019-0.042,0.04-0.064,0.059c-0.124,0.106-0.246,0.214-0.361,0.329
                                c-0.018,0.018-0.033,0.038-0.05,0.055c-0.116,0.12-0.23,0.242-0.337,0.371c-0.023,0.027-0.042,0.058-0.064,0.085
                                c-0.098,0.122-0.193,0.246-0.281,0.376c-0.024,0.036-0.045,0.076-0.068,0.112c-0.08,0.125-0.16,0.251-0.232,0.382
                                c-0.023,0.044-0.043,0.091-0.065,0.136c-0.065,0.128-0.131,0.255-0.187,0.388c-0.025,0.059-0.044,0.122-0.067,0.182
                                c-0.047,0.122-0.096,0.243-0.135,0.369c-0.023,0.076-0.039,0.155-0.06,0.232c-0.031,0.114-0.064,0.226-0.088,0.342
                                c-0.019,0.09-0.028,0.183-0.043,0.274c-0.017,0.107-0.037,0.213-0.049,0.322c-0.01,0.093-0.01,0.189-0.015,0.283
                                c-0.006,0.109-0.017,0.216-0.017,0.326c0,0.001,0,0.002,0,0.004c0,0.001,0,0.002,0,0.003v122.857c0,3.313,2.687,6,6,6s6-2.687,6-6
                                V54.221l33.2,0.04h0.007c22.949,0,35.08,11.521,35.08,33.316v4.861v78.633c0,3.313,2.687,6,6,6s6-2.687,6-6V92.438v-4.861
                                C352.886,73.313,348.68,62.055,340.386,54.117z"/>
                            <path fill="#9AC992" d="M653.074,48.252c0-3.313-2.687-6-6-6s-6,2.687-6,6v116.851l-33.2-0.04h-0.007
                                c-22.949,0-35.08-11.521-35.08-33.316V48.252c0-3.313-2.687-6-6-6s-6,2.687-6,6v83.495c0,14.264,4.206,25.521,12.5,33.459
                                c8.219,7.866,19.851,11.855,34.569,11.857c0.002,0,0.003,0,0.003,0l39.208,0.047h0.007c0.207,0,0.411-0.011,0.613-0.031
                                c0.071-0.007,0.139-0.021,0.209-0.031c0.13-0.019,0.26-0.033,0.386-0.06c0.078-0.016,0.152-0.039,0.229-0.059
                                c0.116-0.028,0.234-0.054,0.348-0.089c0.027-0.009,0.053-0.021,0.081-0.03c0.159-0.052,0.317-0.106,0.47-0.172
                                c0.037-0.016,0.072-0.036,0.109-0.053c0.141-0.063,0.281-0.127,0.415-0.2c0.024-0.013,0.046-0.028,0.069-0.041
                                c0.145-0.082,0.288-0.166,0.426-0.259c0.038-0.026,0.073-0.057,0.111-0.083c0.119-0.085,0.237-0.17,0.35-0.262
                                c0.041-0.034,0.078-0.072,0.117-0.107c0.105-0.091,0.211-0.182,0.309-0.28c0.033-0.032,0.063-0.069,0.094-0.103
                                c0.101-0.105,0.201-0.211,0.294-0.323c0.034-0.041,0.063-0.085,0.095-0.127c0.086-0.109,0.172-0.219,0.251-0.335
                                c0.034-0.05,0.063-0.104,0.095-0.156c0.07-0.111,0.143-0.222,0.205-0.338c0.033-0.06,0.059-0.122,0.089-0.183
                                c0.056-0.113,0.114-0.225,0.164-0.342c0.03-0.071,0.054-0.146,0.081-0.219c0.041-0.11,0.086-0.219,0.121-0.331
                                c0.031-0.1,0.053-0.203,0.078-0.305c0.023-0.09,0.051-0.179,0.069-0.27c0.021-0.104,0.033-0.213,0.05-0.318
                                c0.014-0.093,0.032-0.184,0.042-0.277c0.01-0.1,0.011-0.202,0.016-0.304s0.016-0.203,0.016-0.307c0-0.001,0-0.002,0-0.004
                                c0-0.001,0-0.002,0-0.003V48.252z"/>
                            <path fill="#9AC992" d="M540.867,165.063c-22.949,0-35.08-11.521-35.08-33.316V40.022h20.422c3.313,0,6-2.687,6-6s-2.687-6-6-6
                                h-20.422V9.99c0-3.313-2.687-6-6-6s-6,2.687-6,6v116.895v4.862c0,14.264,4.206,25.521,12.5,33.459
                                c8.221,7.868,19.855,11.857,34.58,11.857c3.313,0,6-2.687,6-6S544.181,165.063,540.867,165.063z"/>
                            <path fill="#9AC992" d="M159.157,0H22.055C9.875,0,0,9.874,0,22.054v137.103c0,12.181,9.875,22.055,22.055,22.055h64.313V96.762
                                c0-14.209-7.358-22.319-21.878-24.119c-3.458,6.611-11.53,11.464-19.342,11.464c-9.841,0-32.993-7.861-32.993-18.616
                                s23.152-18.616,32.993-18.616c8.196,0,16.459,5.174,19.7,12.19c8.981,0.94,16.664,3.867,22.461,8.535
                                c3.048-14.418,13.453-23.673,29.018-25.687c3.218-7.058,11.5-12.266,19.735-12.266c9.841,0,32.993,7.861,32.993,18.616
                                c0,10.754-23.152,18.615-32.993,18.615c-7.755,0-15.798-4.805-19.285-11.357c-11.34,1.821-16.858,8.866-16.858,21.502v104.188
                                h59.238c12.18,0,22.054-9.874,22.054-22.055V22.054C181.211,9.874,171.337,0,159.157,0z"/>
                            <path fill="#9AC992" d="M22.041,65.492c0,3.564,16.227,8.73,23.107,8.73c4.966,0,11.266-4.11,11.266-8.73
                                c0-4.619-6.3-8.729-11.266-8.729C38.268,56.763,22.041,61.928,22.041,65.492z"/>
                            <path fill="#9AC992" d="M159.17,48.264c0-3.564-16.227-8.729-23.107-8.729c-4.966,0-11.266,4.11-11.266,8.729
                                c0,4.62,6.3,8.73,11.266,8.73C142.943,56.994,159.17,51.829,159.17,48.264z"/>
                        </svg> */}
                    </NavbarBrand>
                </div>

{/* *********************************************************** ACCOUNT ********************************************************* */}
                <NavLink  title="login" tag={Link} to="/login" className=" p-0"><h4 className="d-flex text-align-center justify-content-center m-0"><i className="far fa-user-circle"></i></h4></NavLink>
                {/* navbar toggle for devices smaller than 576px */}
                <NavbarToggler className="d-block p-0 py-3 ml-2" onClick={toggleNavbar}>
                    <div ref={toggleMenuIconRef} className="menu-icon"><span></span><span></span><span></span></div>
                </NavbarToggler>

{/* *********************************************************** SIDEBAR ********************************************************* */}
                <div ref={toggleNavbarRef} className="sidebar">
                    <Nav  vertical className="mx-3">
                        {navItemsElement}
                    </Nav>
                </div>
                {/* *********************************************************** TOPBAR ********************************************************* */}
                <Collapse className="topbar" isOpen={!state.collapsed} navbar>

                    <Nav horizontal="center" vertical="align-items-end">
                        {navItemsElement}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        socket: state.socket,
    };
};
export default connect(mapStateToProps, { setUserAction, setSocketAction })(
    Navigation
);
