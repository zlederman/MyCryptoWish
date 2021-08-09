import { Navbar, Nav, Container } from 'react-bootstrap';
import React from "react";
const Navigation = () => {
        return (
            <>    
            <Container>
                <Navbar collapseOnSelect fixed="top" bg="dark" variant="dark"  >
                <Container>
                <Navbar.Brand href="#">My Crypto Wish</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-Navbar-nav"/>
                    <Navbar.Collapse id="responsive-Navbar-nav">
                        <Nav variant="pills" defaultActiveKey="/#">
                            <Nav.Item>
                                <Nav.Link href="/home">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/purchase">Purchase Guide</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/about">About</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </Container>
</>

    );
};

export default Navigation;