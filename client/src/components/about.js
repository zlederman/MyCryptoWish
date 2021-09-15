import {Nav,Navbar,Figure} from 'react-bootstrap';
import React, {Component, useRef} from 'react';
import ProgressBar from './ProgressBar';


class AboutPage extends Component{
    render(){
        return(
                <div id="about-page">
                <Navbar>
                    <Navbar.Brand className="nav-brand"><b>MyCryptoWish</b></Navbar.Brand>
                    <Nav.Link className="nav-item">About</Nav.Link>
                    <Nav.Link className="nav-item">Team</Nav.Link>
                    <Nav.Link className="nav-item">Purchase Guide</Nav.Link>
                    <Nav.Link className="nav-item">Provenance</Nav.Link>
                    <Nav.Link className="nav-item">Gallery</Nav.Link>
                </Navbar>
                <div className="progress-container">
                    <ProgressBar></ProgressBar>
                </div>
                <div className="about-brief">
                    <div className="about-brief-p"> 
                        <h3><b>Your Wish Is My Command</b></h3>                 
                        <p>
                        I am not a genie nor a god, so I cannot guarantee that your personal wish comes true. 
                        What I can guarantee is that by purchasing a MyCryptoWish NFT,
                        you are contributing to granting the wishes of countless critically ill children by benefitting
                        the Make-A-Wish Foundation. In doing so, you are conducting a net positive transaction with society, and it 
                        is a well-known fact that good deeds reciprocate*. 
                        </p>
                    </div>
                    <div className="about-brief-img">
                        <div>
                        <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src="holder.js/171x180"
                            />
                            <Figure.Caption>
                                Wish #adskfjhdasdf
                            </Figure.Caption>
                        </Figure>
                        </div>
                    </div>
                </div>
                <div className="about-team">
                    <h3><b>The Team</b></h3>
                    <div className="team-underline"></div>
                    <p><b><i>Created by 3 College Kids wanting to<br></br> learn more about NFTs and give back</i></b></p>
                    <div>
                    {/* need a list of names n shit */}
                    </div>
                </div>
            </div>
              
        )

    }
}
export default AboutPage