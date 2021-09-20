import {Nav,Navbar,Figure} from 'react-bootstrap';
import React, {Component, useRef} from 'react';
import ProgressBar from './ProgressBar';


class AboutPage extends Component{
    render(){
        return(
                <div className="container" id="page">
                    <div className="container" id="nav">
                        <Navbar className="ml-left" expand="xxl">
                            <div id="brand"><Navbar.Brand id="nav-brand"><h3>MyCryptoWish</h3></Navbar.Brand></div>
                            <Nav.Link className="nav-item">About</Nav.Link>
                            <Nav.Link className="nav-item">Team</Nav.Link>
                            <Nav.Link className="nav-item">Purchase</Nav.Link>
                            <Nav.Link className="nav-item">Provenance</Nav.Link>
                            <Nav.Link className="nav-item">Gallery</Nav.Link>
                        </Navbar>
                    </div>
                    <div className="container" id="progress">
                        <ProgressBar></ProgressBar>
                    </div>
                    <div className="container" id="brief">
                        <div className="brief-p"> 
                            <h3><b>Your Wish Is My Command</b></h3>                 
                            <p>
                            I am not a genie nor a god, so I cannot guarantee that your personal wish comes true. 
                            What I can guarantee is that by purchasing a MyCryptoWish NFT,
                            you are contributing to granting the wishes of countless critically ill children by benefitting
                            the Make-A-Wish Foundation. In doing so, you are conducting a net positive transaction with society, and it 
                            is a well-known fact that good deeds reciprocate*. 
                            </p>
                        </div>
                        <div className="brief-img">
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
                    <div className="container" id="team">
                        <div className="team-text">
                            <div className="heading team" >
                                <h3 className="section-heading"><b><i>The Team</i></b></h3>
                            </div>
                            <div className="underline" id="team"></div>
                            <div className="sub-heading team" id="team">
                                <h5><b><i>Three college kids wanting to<br>
                                </br> learn more about NFTs and give back</i></b></h5>
                            </div>
                            <div id="desc">
                                <ul id="members-list">
                                    <li>
                                        <div>
                                            <b>Evan</b> Dude that chills
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div>
                                            <b>Zach</b> Dude that codes
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <b>Sebastian</b> Dude that also codes
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="team-img"></div>
                    </div>
                    <div className="container" id="about">
                    </div>
                    <div className="container" id="purchase-guide">
                        <div className="purchase-text">
                            <div className="heading purchase" >
                                    <h3 className="section-heading"><b><i>Purchase Guide</i></b></h3>
                                    <div>
                                        <ul id="purchase-steps">
                                            <li><b>Step 1:</b> Acquire Ethereum! (0.3 ETH) to make a wish</li>
                                            <li><b>Step 2:</b> Install Metamask (On supported Browser)</li>
                                            <li><b>Step 3:</b> Find Your Wallet Secret</li>
                                            <li><b>Step 4:</b> Load Your Wallet Secret Into Metamask</li>
                                            <li><b>Make your wish!</b></li>
                                            
                                        </ul>
                                    </div>
                            </div>
                        </div>
                        <div className="links">
                            <div className="link" id="coinbase">
                                <a className="hyperlink"href="https://www.coinbase.com/"><b>coinbase.com</b></a>
                            </div>
                            <div className="link" id="metamask">
                                <a className="hyperlink"href="https://metamask.io/"><b>metamask.io</b></a>
                            </div>
                        </div>
                    </div>
                    <div className="container" id="provenance">
                    </div>
                    <div className="container" id="gallery">
                    </div>
                </div>
              
        )

    }
}
export default AboutPage