import React, {Component} from 'react';
import {Nav,Navbar,Container} from 'react-bootstrap';
//import Offcanvas from 'react-bootstrap/Offcanvas'
import {Button} from "react-bootstrap"
import grass from "../assets/grass.png"
import well from "../assets/well.png"
import moon from "../assets/moon.png"
import mcw from "../assets/MCW.png"
import cloud1 from "../assets/cloud1.png"
import cloud2 from "../assets/cloud2.png"
import cloud3 from "../assets/cloud3.png"
import discord from "./rafflepage/icons/Discord-Logo-Black.svg"
import "../App.css"



class NightSky extends Component{
    state = {stars: []}
    componentDidMount = () =>{
        this.setState({stars: this.allStars()})
    }
    allStars = () =>{
        let elements = Array(500)
        for(let i = 0; i< 500; i++){
            elements[i] = this.buildStar(i);
        }
        return elements
    }
    buildStar = (i) => {
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        let duration = Math.random() * 10;
        let size = Math.random() *0.05;
        let size_svg = 10
        return React.createElement("svg",{
            className: "svg", 
            style:{
                left: x +"px",
                top: y + "px",
                width: 1 + size_svg + "px",
                height: 1 + size_svg +"px",
                animationDuration: 5 + duration + "s",
                animationDelay: duration+'s',
            }
           
        },
        React.createElement("polygon",
        {
            points: "100,10 40,198 190,78 10,78 160,198",
            fill:"white",
            style :{
                transform: `scale(${size})`,
                height:"auto",
            }
        })
        );
    }

    onClick(e){
        console.log(e.detail === 3? "EVANS MESSAGE" : "YOU DONT GET THE READ");
    }

    render() {
        return <div onClick={this.onClick} className="sky">
            <div className="container" id="nav" >
            {/* <Navbar bg="light" expand={false}>
            <Container fluid>
                <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar> */}
                <Navbar collapseOnSelect expand="lg" bg="transparent">
                    <Container>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#brief" className="nav-item"><h3>ABOUT</h3></Nav.Link>
                            <Nav.Link href="#team" className="nav-item"><h3>TEAM</h3></Nav.Link>
                            <Nav.Link href="#gallery" className="nav-item"><h3>GALLERY</h3></Nav.Link>
                            <Nav.Link href="#purchase-guide" className="nav-item"><h3>HOW TO PURCHASE</h3></Nav.Link>
                            <Nav.Link className="nav-item"><h3>PROVENANCE</h3></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Brand ><img  className="nav-bar-img" src={discord}/></Navbar.Brand>
                    <Button variant="dark" style={{position: 'relative', top: '10px', background: '#FDD644', fontSize: 10}}>Connect Wallet</Button> 
                    </Container>
                </Navbar>
            </div>
            <img  className="background" src={grass}/>
            <img  className="moon" src={moon}/>
            <img  className="mcw" src={mcw}/>
            {/* <img  className ="cloud-one cl" src={cloud1}/>
            <img  className ="cloud-two cl" src={cloud2}/>
            <img  className ="cloud-three cl" src={cloud3}/>
            <img  className ="cloud-four cl" src={cloud1}/> */}
            <img className="well" src={well}/>
            <div className="MCWButton">
                <Button href="#raffle" variant="dark" style={{background: '#A69A65'}}>Make Your Wish!</Button> 
            </div>
            
            
            {this.state.stars}
        </div>
    }
}
export default NightSky;