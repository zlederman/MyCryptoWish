import {Nav,Navbar,Figure} from 'react-bootstrap';
import React, {Component, useRef} from 'react';
import ProgressBar from './ProgressBar';
import Carousel from "./gallerypage/gallerypage"
import einstein from "../assets/einstein.png"
import fireman from "../assets/Fireman.png"
import ninja from "../assets/ninja.png"
import rainbow from "../assets/rainbow.png"


class AboutPage extends Component{
    render(){
        return(
                <div className="container" id="page">
                    {/* <div className="container" id="nav">
                        <Navbar className="ml-left " expand="xxl">
                            <Nav.Link href="#brief" className="nav-item"><h3>About</h3></Nav.Link>
                            <Nav.Link href="#team" className="nav-item"><h3>Team</h3></Nav.Link>
                            <Nav.Link href="#purchase-guide" className="nav-item"><h3>How To Purchase</h3></Nav.Link>
                            <Nav.Link className="nav-item"><h3>Provenance</h3></Nav.Link>
                            <Nav.Link className="nav-item"><h3>Gallery</h3></Nav.Link>
                        </Navbar>
                    </div> */}
                    
                    {/* <div className="container" id="progress">
                        
                        
                        <ProgressBar></ProgressBar>
        
                    </div> */}
                   
                    <div className="container" id="brief">
                        <div className="brief-p"> 
                            <h2 className="section-heading"><b><i>Your Wish Is My Command</i></b></h2>               
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
                                <h2 className="section-heading"><b><i>The Team</i></b></h2>
                            </div>
                            <div className="underline" id="team"></div>
                            <div className="sub-heading team" id="team">
                                <h5><b><i>Three college kids wanting to<br>
                                </br> learn more about NFTs and give back</i></b></h5>
                            </div>
                            <div id="description">
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
                        <div className="team-img-container">
                            <div className="top-container">
                                <div className="team-img-top"></div>
                            </div>
                            <div className="bottom-container">
                                <div className="team-img-bottom"></div>
                                <div className="team-img-bottom"></div>
                            </div>

                        </div>
                        
                    </div>

                    <div className = "container" id="gallery">
                        <Carousel
                            show={3}
                            infiniteLoop={true}
                        >
                            <div>
                                <div style={{padding: 8}}>
                                    <img src={einstein} alt="placeholder" style={{width: '100%'}} />
                                </div>
                            </div>
                            <div>
                                <div style={{padding: 8}}>
                                    <img src={fireman} alt="placeholder" style={{width: '100%'}} />
                                </div>
                            </div>
                            <div>
                                <div style={{padding: 8}}>
                                    <img src={ninja} alt="placeholder" style={{width: '100%'}} />
                                </div>
                            </div>
                            <div>
                                <div style={{padding: 8}}>
                                    <img src={rainbow} alt="placeholder" style={{width: '100%'}} />
                                </div>
                            </div>
                            <div>
                                <div style={{padding: 8}}>
                                    <img src={ninja} alt="placeholder" style={{width: '100%'}} />
                                </div>
                            </div>
                        </Carousel>
                    </div>
                    
                    

                    <div className="container line"></div>
                    <div className="container" id="about">
                    </div>
                    <div className="container" id="purchase-guide">
                        <div className="purchase-text">
                            <div className="heading purchase" >
                                    <h2 className="section-heading"><b><i>Purchase Guide</i></b></h2>
                                    <div>
                                        <ul id="purchase-steps">
                                            <li><b>Step 1:</b> Acquire Ethereum! (0.3 ETH) to make a wish</li>
                                            <li><b>Step 2:</b> Install Metamask (On supported Browser)</li>
                                            <li><b>Step 3:</b> Find Your Wallet Secret</li>
                                            <li><b>Step 4:</b> Load Your Wallet Secret Into Metamask</li>
                                            <li><b>Step 5:</b> Make your wish!</li>
                                            
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
                    <div className="container line"></div>
                    <div className="container" id="provenance">
                    </div>
                    <div className="container" id="gallery">
                    </div>
                </div>
              
        )

    }
}
export default AboutPage