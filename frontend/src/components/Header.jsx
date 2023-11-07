
import './styles.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  const nombre = useSelector((store) => store.username);

  return (
    <Navbar className="bg-salmon d-flex justify-content-between align-items-center" variant="dark">
      <Navbar.Brand href="#home">
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Proyecto CMF</div>
      </Navbar.Brand>
      <div className="text-white" style={{ fontSize: '18px' }}>
        ¡Hola, {nombre}!
      </div>
    </Navbar>
  );
}

