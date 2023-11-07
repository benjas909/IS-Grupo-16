
import React from 'react';
import Card from 'react-bootstrap/Card';

export default function Index() {
  const prestamos = [
    { id: 1, nombre: 'Préstamo 1', monto: 1000 },
    { id: 2, nombre: 'Préstamo 2', monto: 2000 },
    { id: 3, nombre: 'Préstamo 3', monto: 3000 },
  ];

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Prestamos</Card.Title>
          <ul className="list-group">
            {prestamos.map((prestamo) => (
              <li key={prestamo.id} className="list-group-item d-flex justify-content-between align-items-center">
                {prestamo.nombre} - Monto: {prestamo.monto} USD
                <button className="btn btn-success">Aprobar</button>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}
