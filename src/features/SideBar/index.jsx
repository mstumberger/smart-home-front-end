// sidebar.js

import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import WsConnection from "../websocket/WsConnection";
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'

export default props => {
    return (
        <Menu>
            <a className="menu-item" >
                <WsConnection />
            </a>
            <a className="menu-item">
                <Nav.Link as={Link} to="/">
                Home
                </Nav.Link>
            </a>
            <a className="menu-item">
                <Nav.Link as={Link} to="/clientSetup">
                clientSetup
                </Nav.Link>
            </a>

            <a className="menu-item">
                <Nav.Link as={Link} to="/notifications">
                notifications
                </Nav.Link>
            </a>

            <a className="menu-item">
                <Nav.Link as={Link} to="/alarmSetup">
                alarmSetup
                </Nav.Link>
            </a>

            <a className="menu-item">
                <Nav.Link as={Link} to="/eventHistory">
                eventHistory
                </Nav.Link>
            </a>

            <a className="menu-item">
                <Nav.Link as={Link} to="/statistics">
                statistics
                </Nav.Link>
            </a>

            <a className="menu-item">
                <Nav.Link as={Link} to="/userSetup">
                userSetup
                </Nav.Link>
            </a>

            <a className="menu-item">
                <Nav.Link as={Link} to="/logIn">
                logIn
                </Nav.Link>
            </a>

            <a className="menu-item">
                <Nav.Link as={Link} to="/logOut">
                logOut
                </Nav.Link>
            </a>
        </Menu>
    );
};