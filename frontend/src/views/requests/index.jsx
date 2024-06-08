
import React from 'react';
// import React from "react";
import useSWR from "swr";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
// import DeleteForm from "../../components/DeleteForm";
import { getByExecID } from "../../repositories/request";
import { getAllReqs } from "../../repositories/request";

export default function index() {
	// eslint-disable-next-line
	const userId = localStorage.getItem('id');
  const role = localStorage.getItem('role');

  let fetchData;
  if (role === 'supervisor') {
    fetchData = () => getByExecID(userId);
  } else if (role === 'gerente') {
    fetchData = getAllReqs;
  }

  const { data, error } = useSWR(role === 'supervisor' ? `/requests/exec/${userId}` : "/requests/all", fetchData, {
    initialData: [],
    revalidateOnMount: true,
  });

  const tbody = [];

	data.forEach(({ rutSolicitante, plazo, total, id , id_ejecutivo}) => {
		tbody.push(
			<tr>
				<td>{rutSolicitante}</td>
				<td>{plazo}</td>
				<td>{total}</td>
				<td>
					<Link to={`requests/${id}`}>
						<a href={`requests/${id}`} className="btn btn-success" style={{backgroundColor: '#427D9D', color: '#FFFFFF', border: '2px solid #9BBEC8'}}>
							Ver Detalles
						</a>
					</Link>
				</td>
				<td>{id_ejecutivo}</td>
			</tr>
		);
	});

  return (
		<Container className="pt-4">
			<div className="d-flex align-items-center">
				<h1>Lista de cotizaciones por Ejecutivo</h1>
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Rut Solicitante</th>
						<th>Cuotas</th>
            			<th>Valor</th>
						<th>Acciones</th>
						<th>ID Ejecutivo</th>
					</tr>
				</thead>
				<tbody>{tbody}</tbody>
			</Table>
		</Container>
	);
}
