import React, { Component } from "react";
import {Container,Form,Jumbotron,Button} from "react-bootstrap";

class CardFooter extends Component {
   
    constructor(props) {

        console.log(props)
        super(props)
        this.state = {
            visible: false,
        }
    }
       
    alterVisibility =() => {
        this.setState(prevState => ({
            visible: !prevState.visible
          }));
    }

    handleWishClick =() => {
        this.props.handleClick(); 
        this.alterVisibility();
        console.log("hwerwer"); 
    }



    render() {
        return(
        <Jumbotron fluid className={(this.state.visible ? "fadeOut " : "fadeIn ") + "vh fixed-bottom "}
        ref={this.visibilityRef}
        id="card-footer"> 
        <Container>
            <h1>Are You Ready To Make A Wish?</h1>
            <p>
                Welcome the first NFT offering directly benefiting Make
                A Wish Foundation!
            </p>
            <Button onClick={this.handleWishClick} >Make Your Wish!</Button>
        </Container>
        </Jumbotron>
        )
    
}
}
export default CardFooter;