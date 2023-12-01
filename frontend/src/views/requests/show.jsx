import React from "react";
import useSWR from "swr";

import { useParams } from "react-router-dom";
import { getReq } from "../../repositories/request";

export default function show() {
	const { id } = useParams();
	// eslint-disable-next-line
	const { data, error } = useSWR(id, {
		fetcher: getReq,
		initialData: [],
		revalidateOnMount: true,
	});
	return (
		<div className="container">
			<table className="table">
				<tbody>
					<tr>
						<th>Rut Solicitante:</th>
						<td>{data.rutSolicitante}</td>
					</tr>
					<tr>
						<th>Tasa</th>
						<td>{data.tasa}</td>
					</tr>
					<tr>
						<th>Plazo</th>
						<td>{data.plazo}</td>
					</tr>
                    <tr>
						<th>Valor de cuota en UF</th>
						<td>{data.cuota}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
