// app.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import UserAdd from "./views/users/create";
import Userlogin from "./views/users/login";

import LoanCalculatorView from "./views/sims/LoanCalculatorView";
import LoanCalculatorView2 from "./views/sims/LoanCalculatorView2";

import ReqsHome from "./views/requests/index";
import ReqsView from "./views/requests/show";

import Home from "./views/Home";

export default function App() {
	const [userRole, setUserRole] = useState("none");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const role = String(localStorage.getItem("role")).toLowerCase();
		setUserRole(role);
		setIsLoggedIn(!!token);
	}, []);

	return (
		<Router>
			<div>
				<Header />
				<Container fluid className="p-0">
					<Row className="no-gutters">
						<Col xs="2">
							<Sidebar userRole={userRole} setUserRole={setUserRole} />
						</Col>
						<Col xs="10">
							<Switch>
								{!isLoggedIn && (
									<React.Fragment>
										<Route exact path="/users/register">
											<UserAdd />
										</Route>
										<Route exact path="/users/login">
											<Userlogin />
										</Route>
										<Route exact path="/">
											<LoanCalculatorView2 />
										</Route>
									</React.Fragment>
								)}

								{userRole === "user" && (
									<Route exact path="/">
										<LoanCalculatorView2 />
									</Route>
								)}

								{userRole === "analista" && (
									<Route path="/">
										<LoanCalculatorView />
									</Route>
								)}

								{userRole === "supervisor" && (
									<React.Fragment>
										<Route exact path="/requests/:id">
											<ReqsView />
										</Route>
										<Route exact path="/requests">
											<ReqsHome />
										</Route>

										<Route exact path="/">
											<LoanCalculatorView />
										</Route>
									</React.Fragment>
								)}
							</Switch>
						</Col>
					</Row>
				</Container>
			</div>
		</Router>
	);
}
