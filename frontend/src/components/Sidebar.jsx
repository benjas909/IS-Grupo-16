
// import React from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <div style={{ background: '#333', minHeight: '100vh', padding: '15px' }}>
//       <Navbar className="bg-dark" variant="dark">
//         <Nav defaultActiveKey="/" className="flex-column sidebar-sticky">
//           <Link to="/"><Nav.Link href="/">Inicio</Nav.Link></Link>
//           <Link to="/users"><Nav.Link href="/users">Usuarios</Nav.Link></Link>
//           {/* <Link to="/sim"><Nav.Link href="/sim">Prestamos</Nav.Link></Link> */}
//           <Link to="/requests"><Nav.Link href="/requests">Solicitudes Ingresadas</Nav.Link></Link>
//         </Nav>
//       </Navbar>
//     </div>
//   );
// }

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export default function Sidebar({ userRole }) {
  return (
    <div style={{ background: '#333', minHeight: '100vh', padding: '15px' }}>
      <Navbar className="bg-dark" variant="dark">
        <Nav defaultActiveKey="/" className="flex-column sidebar-sticky">
          <Link to="/"><Nav.Link href="/">Inicio</Nav.Link></Link>
          <Link to="/users/login"><Nav.Link href="/">Iniciar sesión</Nav.Link></Link>
          
          {userRole === "supervisor" && (
            <>
              <Link to="/requests"><Nav.Link href="/requests">Solicitudes Ingresadas</Nav.Link></Link>
            </>
          )}
          
          {/* Otros enlaces basados en el rol del usuario */}
        </Nav>
      </Navbar>
    </div>
  );
}
