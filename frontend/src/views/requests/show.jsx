import React from "react";
import useSWR from "swr";

import { useParams } from "react-router-dom";
import { getReq } from "../../repositories/request";

export default function show() {
	const { id } = useParams();

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
						<th>ID:</th>
						<td>{data.id}</td>
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
						<th>Cuotas</th>
						<td>{data.cuota}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
