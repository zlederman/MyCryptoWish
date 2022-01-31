import React, { Component } from "react";
import "./raffle.css"
import { useEffect, useState } from "react";
import {Form,Button,Row,Col, Card} from "react-bootstrap"
import sample from "./star-sample.png"
import Cowboy from "./icons/cowboy.png"

// import einstein from "../assets/einstein.png"
// import fireman from "../assets/Fireman.png"
// import ninja from "../assets/ninja.png"
// import rainbow from "../assets/rainbow.png"
// import seb from "./assets/seb.png"

const RafflePage = (props) => {  

    return (
        <div className="raffle-page" id="raffle-form">
            <div className="left-container">
                <TimerContainer/>
                <RaffleForm addToRaffle={props.addToRaffle} ></RaffleForm>
                
            </div>
            <div className="right-container">
            <Card style={{ width: 'auto', height: 'auto', right: '12%', borderRadius: '10px'}}>
                <Card.Img style={{ width: '92%', height: 'auto', right: '12%', borderRadius: '10px'}} variant="top" src={Cowboy}/>
                <Card.Body>
                    {/* <Card.Title>Wish #MY Cryco Ti </Card.Title> */}
                    <Card.Text>
                        <b>100% of profit</b> and secondary royalty go directly to <b> St. Jude Children’s Research Hospital</b>. 
                    </Card.Text>
                </Card.Body>
            </Card>
                {/* <CardImage/> */}
            </div>
        </div>



    )
}

// function CardImage() {
//     const state = {
//         currentImage: 0,
//         images: [
//         //   einstein, 
//         //   fireman, 
//         //   ninja, 
//         //   seb
//         ]
//       };
    

//     const switchImage = () => {
//         if (this.state.currentImage < this.state.images.length - 1) {
//             this.setState({
//             currentImage: this.state.currentImage + 1
//             });
//         } else {
//             this.setState({
//             currentImage: 0
//             });
//         }
//         return this.currentImage;
//     };

//     componentDidMount(() => {
//         setInterval(switchImage(), 200);
//     }); 

//     return (
//         <Card style={{ width: 'auto', height: 'auto', right: '12%'}}>
//             <Card.Img variant="top" src={this.state.images[this.state.currentImage]}/>
//             <Card.Body>
//                 <Card.Title>Wish #acfr43df</Card.Title>
//                 <Card.Text>
//                     A mystical star with hair so fly, they're in space
//                 </Card.Text>
//             </Card.Body>
//         </Card>

//     ); 

// }

//IMPORTANT
//1. block off with nonce -> unique to every signnature
//2. check to see if the nonce is used
//3. can only use nonce once
//4. only sign if they are a winner 
//5. Sign with string and has to have that version number clear what signatures are for
//6. Maybe have a way to change that version 


function TimerContainer() {
    const calculateTimeLeft = () => {
      let year = new Date().getFullYear();
      const difference = + new Date(`${year}-1-30`) - +new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [year] = useState(new Date().getFullYear());
  
    useEffect(() => {
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    });
  
    const timerComponents = [];
  
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval]) {
        return;
      }
  
      timerComponents.push(
        <div className="time-container">
            <div className="time-value">
                <span>{timeLeft[interval]}</span>
            </div>
            <div className="time-unit">
                {interval}
            </div>

        </div>
      );

    });

    return (
      <div className="timer-container">
        {timerComponents.length ? timerComponents : <span>Countdown begins at 10,000 on Discord</span>}
      </div>
    );
  }

const RaffleForm = (props) => {
    const [quantity, setQuantity] = useState(1);


    const handleSubmit = (evt) => {
        evt.preventDefault()
        props.addToRaffle(quantity);
    }
    
    return (
        <div className="form-container" >
            <div className="info-container" id="raffle">
              <h2 className="section-heading"><i>Make Your Wish</i></h2>  
            </div>
          
            <Form>
                <Form.Group as={Row} controlId="formGridState" id="Selector">
                    <Form.Label>Wish Quantity</Form.Label>
                    <Form.Control className="form" as="select" defaultValue="Choose..."  onChange={e => setQuantity(e.target.value)}>
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" style={{background: '#FDD644', borderColor: '#FDD644', color:'#0A0818'}} type="submit" onClick={handleSubmit}>
                Enter Raffle
                </Button>
            </Form>
                </div>
    )
}

export  {RafflePage, TimerContainer};