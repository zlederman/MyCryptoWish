import React, { Component } from "react";
import {Card} from "react-bootstrap";

class CardFooter extends Component {
    render() {
        return(
        <Card className="text-center fixed-bottom">
        <Card.Body>
            <Card.Title>My Crypto Wish</Card.Title>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
        </Card.Body>
        </Card>
        )
    }
}
export default CardFooter;