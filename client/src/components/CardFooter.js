import React, { Component } from "react";
import {Container,Jumbotron,Button} from "react-bootstrap";

class CardFooter extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
        this.visibilityRef = React.createRef();
        this.alterVisibility = this.alterVisibility.bind(this)
    }
    alterVisibility =() => {
        console.log("o")
        this.setState(prevState => ({
            visible: !prevState.visible
          }));
      
    }
    render() {
        return(
        <Jumbotron fluid className={(this.state.visible ? "fadeOut " : "fadeIn ") + "vh fixed-bottom"}
        ref={this.visibilityRef}>
        <Container>
            <h1>Are You Ready To Make A Wish?</h1>
            <p>
                Welcome to the first NFT offering directly benefiting Make
                A Wish Foundation!
            </p>
            <Button onClick={this.alterVisibility} >Make Your Wish!</Button>
        </Container>
        </Jumbotron>
        )
    }
}
export default CardFooter;