import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Root() {
	// const router = useRouter();

	function handleSearch(event: React.FormEvent) {
		// event.preventDefault();
		// const formData = new FormData(event.target as HTMLFormElement);
		// const { keyword } = Object.fromEntries(formData);
		// router.push("/search?keyword=" + keyword);
	}

	return (
		<>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="/">ZigvyBlog</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/">Home</Nav.Link>
							<Nav.Link href="/">About</Nav.Link>
							<Nav.Link href="/">Contact</Nav.Link>
						</Nav>
						<Form>
							<Row>
								<Col xs="auto">
									<Form.Control
										type="text"
										placeholder="Search"
										className=" mr-sm-2"
									/>
								</Col>
								<Col xs="auto">
									<Button type="submit">Submit</Button>
								</Col>
							</Row>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}
