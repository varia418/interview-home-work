import React from "react";
import {
	Outlet,
	Link,
	useNavigate,
	createSearchParams,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Root() {
	const navigate = useNavigate();

	function handleSearch(event: React.FormEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const { keyword } = Object.fromEntries(formData);
		navigate({
			pathname: "search",
			search: createSearchParams({
				keyword: keyword as string,
			}).toString(),
		});
	}

	return (
		<>
			<Navbar expand="lg" sticky="top" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand>
						<Link className="navbar-brand" to="/">
							ZigvyBlog
						</Link>{" "}
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link>
								<Link className="nav-link" to="/">
									Home
								</Link>{" "}
							</Nav.Link>
							<Nav.Link>
								<Link className="nav-link" to="/posts/1">
									About
								</Link>{" "}
							</Nav.Link>
							<Nav.Link>
								<Link className="nav-link" to="/search">
									Contact
								</Link>{" "}
							</Nav.Link>
						</Nav>
						<Form onSubmit={handleSearch}>
							<Row>
								<Col xs="auto">
									<Form.Control
										type="text"
										placeholder="Keyword"
                                        name="keyword"
										className=" mr-sm-2"
									/>
								</Col>
								<Col xs="auto">
									<Button type="submit">Search</Button>
								</Col>
							</Row>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Outlet />
		</>
	);
}
