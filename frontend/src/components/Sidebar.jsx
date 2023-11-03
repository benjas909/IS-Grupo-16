import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {
  Link,
} from "react-router-dom";

export default function Sidebar() {
    return (
        <Navbar className="bg-light" >
            <Nav defaultActiveKey="/" className="flex-column sidebar-sticky">
                <Link to="/"><Nav.Link href="/">Inicio</Nav.Link></Link>
                <Link to="/users"><Nav.Link href="/users">Usuarios</Nav.Link></Link>
                <Link to="/sim"><Nav.Link href="/sim">Simulador</Nav.Link> </Link>
                <Link to="/super"><Nav.Link href="/super">Vista Supervisor</Nav.Link> </Link>
            </Nav>
        </Navbar>
        )
}
