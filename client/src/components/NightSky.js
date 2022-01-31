import React, {Component} from 'react';
import {Nav,Navbar,Container} from 'react-bootstrap';
import {Button} from "react-bootstrap"
import grass from "../assets/grass.png"
import well from "../assets/well.png"
import moon from "../assets/moon.png"
import mcw from "../assets/MCW.png"
import discord from "./rafflepage/icons/Discord-Logo-Black.svg"
import twitter from "./rafflepage/icons/iconmonstr-twitter-1.svg"
import "../App.css"


class NightSky extends Component{
    constructor(props) {
        super(props);
    }
    

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
                {/* <div className="contianer-nav-button">
                        <Button href="https://discord.gg/5YF2mChwkR" style={{background: 'transparent', borderColor: 'transparent', paddingBottom: '10px'}}><img className="nav-bar-img" src={discord}/></Button>
                        <Button style={{background: 'transparent', borderColor: 'transparent', paddingBottom: '10px'}}><img className="nav-bar-img" src={twitter}/></Button>
                        <Button href="https://discord.gg/5YF2mChwkR" class="enableEthereumButton" variant="dark" style={{background: '#FDD644', color:'#0A0818', fontSize: 10, fontWeight: 'bolder'}}>Discord</Button> position: 'relative', top: '10px',
                </div> */}

                <div className="contianer-navBar"> 
                    <Navbar collapseOnSelect expand="lg" bg="transparent">
                        <Container>
                        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="ml-auto" id="basic-navbar-nav">
                            <Nav pullRight>
                                <Nav.Link className="nav-item" href="#brief"><h3>ABOUT</h3></Nav.Link>
                                <Nav.Link className="nav-item" href="#team"><h3>TEAM</h3></Nav.Link>
                                <Nav.Link className="nav-item" href="#gallery"><h3>GALLERY</h3></Nav.Link>
                                <Nav.Link className="nav-item" href="#purchase-guide"><h3>HOW TO PURCHASE</h3></Nav.Link>
                                <Nav.Link href="https://www.stjude.org/donate/crypto.html#1b3812bc663160deb8f3c14f52a5b8e086f434aa0b3eb347aaf3d1e79bf257ee=7" className="nav-item"><h3>ST. JUDE</h3></Nav.Link> 
                                <Button href="https://discord.gg/5YF2mChwkR" class="enableEthereumButton" variant="dark" style={{background: '#FDD644', color:'#0A0818', fontWeight: 'bolder'}}>Discord</Button>                          
                            </Nav>
                        </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                
            </div>
            
            <img  className="background" src={grass}/>
            {/* <img  className="moon" src={moon}/> */}
            <img  className="mcw" src={mcw}/>
            <img className="well" src={well}/>
            <div className="MCWButton">
                <Button href="https://discord.gg/5YF2mChwkR" className="raffleButton" style={{background: '#A39761',  borderColor: 'transparent', fontSize: '1.8vw', borderWidth: '3px'}}>Join Discord</Button>  
            </div>
            
            
            {this.state.stars}
        </div>
    }
}
export default NightSky;