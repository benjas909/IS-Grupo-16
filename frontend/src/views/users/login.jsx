import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../repositories/user";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';


export default function login() {
	const history = useHistory();

	const [state, setstate] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userRole, setUserRole] = useState("none");
    const dispatch = useDispatch();

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser(state);
			const token = response.data.token;
			const user = response.data.user;
			const role = response.data.user.permissions;
			const id = response.data.user.id;

			if (token) {
        		localStorage.setItem('token', token);
				localStorage.setItem('role', role);
				localStorage.setItem('id', id);
				setIsLoggedIn(true);
				history.push(`/`);
				window.location.reload();
      		}
			
		} catch (error) {
			console.log(error);
			alert("Nombre o contraseña incorrecta");
		}
	};

	return (
		<div className="container mt-4">
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						className="form-control"
						id="email"
						type="email"
						value={state.email}
						onChange={(e) => {
							setstate({ ...state, email: e.target.value });
						}}
						placeholder="Ingrese Email"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Contraseña</label>
					<input
						className="form-control"
						id="password"
						type="password"
						value={state.password}
						onChange={(e) => {
							setstate({ ...state, password: e.target.value });
						}}
						placeholder="Ingrese Contraseña"
						required
					/>
				</div>
				<div className="float-right">
					<button type="submit" className="btn btn-primary">
						Guardar
					</button>
				</div>
                <Link to="/users/register"><Nav.Link href="/">Registrarse</Nav.Link></Link>
			</form>
		</div>
	);
}
