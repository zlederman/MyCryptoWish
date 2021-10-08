import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class WishView extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return(<Button className="trigger-purchase" onClick={this.props.handleClick}>Click Me!</Button>)
        
    }
}

export default WishView