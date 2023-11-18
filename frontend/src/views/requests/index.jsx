
import React from 'react';
// import React from "react";
import useSWR from "swr";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
// import DeleteForm from "../../components/DeleteForm";
import { getAllReqs } from "../../repositories/request";

export default function index() {
	const { data, error } = useSWR("/solicitudes/all", {
		fetcher: getAllReqs,
		initialData: [],
		revalidateOnMount: true,
	});

  const tbody = [];

	data.forEach(({ rutSolicitante, cuota, total, id }) => {
		tbody.push(
			<tr>
		<td>{rutSolicitante}</td>
        <td>{cuota}</td>
        <td>{total}</td>
				<td>
					<Link to={`solicitudes/${id}`}>
						<a href={`solicitudes/${id}`} className="btn btn-success">
							Ver
						</a>
					</Link>
				</td>
			</tr>
		);
	});

  return (
		<Container className="pt-4">
			<div className="d-flex align-items-center">
				<h1>Listado de Solicitudes</h1>
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Rut Solicitante</th>
						<th>Cuotas</th>
            <th>Valor</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>{tbody}</tbody>
			</Table>
		</Container>
	);
}
