
import './styles.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {


  return (
    <Navbar className="bg-blue d-flex justify-content-between align-items-center" variant="dark">
      <Navbar.Brand href="/#home">
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Financiera La Clave</div>
      </Navbar.Brand>
      <div className="text-white" style={{ fontSize: '18px' }}>
    
      </div>
    </Navbar>
  );
}

