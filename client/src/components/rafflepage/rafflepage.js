import React, { Component } from "react";
import "./raffle.css"
import logo from "./icons/logo.png"
import { useEffect, useState } from "react";
import image from "./star-sample.png"
import twitter from "./icons/iconmonstr-twitter-1.svg"
import discord from "./icons/Discord-Logo-Black.svg"
import {Form,Button,Row,Col, Card} from "react-bootstrap"

const RafflePage = (props) => {

    return (
        <div className="raffle-page">
            <div className="left-container">
                <div className="title-container">
                    <img className="logo" src={logo}></img>
                </div>
                <RaffleForm></RaffleForm>
                <TimerContainer/>
               
            </div>
            <div className="right-container">
                <div className="social-container">
                    <div className="twitter-container">
                        <img src={twitter}></img>
                    </div>
                    <div className="discord-container">
                        <img src={discord}></img>
                    </div>
                    
                </div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image}/>
                    <Card.Body>
                        <Card.Title>#acfr43df</Card.Title>
                        <Card.Text>
                            A mystical star with hair so fly, they're in space
                        </Card.Text>
                    
                    </Card.Body>
                </Card>
            </div>
        </div>



    )
}

function TimerContainer() {
    const calculateTimeLeft = () => {
      let year = new Date().getFullYear();
      const difference = +new Date(`${year}-11-1`) - +new Date();
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
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    );
  }
  

const RaffleForm = (props) => {
    return (
        <div className="form-container">
            <div className="info-container">
                <h1>Our Raffle Is Live!</h1>
                <h3>Enter and your wish might just come true</h3>
            </div>
          
            <Form>
                
                <Form.Group  as={Row}  controlId="formBasicEmail">
                    <Form.Label column sm={2}>Discord</Form.Label>
                    <Col>
                    <Form.Control type="email" placeholder="Discord Username"  />
                    </Col>
                    
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group  as={Row}  controlId="formBasicEmail">
                    <Form.Label column sm={2}>Twitter</Form.Label>
                    <Col>
                    <Form.Control type="email" placeholder="Twitter Handle"  />
                    </Col>
                    
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

             
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
                </div>
    )
}
export default RafflePage