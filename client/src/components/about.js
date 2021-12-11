import {Nav,Navbar,Figure, Card, Button} from 'react-bootstrap';
import React, {Component, useRef} from 'react';
import ProgressBar from './ProgressBar';
import Carousel from "./gallerypage/gallerypage"
import einstein from "../assets/einstein.png"
import fireman from "../assets/Fireman.png"
import ninja from "../assets/ninja.png"
import rainbow from "../assets/rainbow.png"
import scuba from "../assets/scuba.png"
import seb from "../assets/seb.png"
import evan from "../assets/evan.png"
import zach from "../assets/zach.png"
import christina from "../assets/christina.png"
import discord from "./rafflepage/icons/Discord-Logo-Black.svg"
import twitter from "./rafflepage/icons/iconmonstr-twitter-1.svg"
import instagram from "./rafflepage/icons/instagram.svg"
import linkedIn from "./rafflepage/icons/linkedin.svg"


class AboutPage extends Component{
    constructor(props) {
        super(props);
        this.switchImage = this.switchImage.bind(this);
        this.state = {
          currentImage: 0,
          images: [
            einstein, 
            fireman, 
            ninja, 
            seb
          ]
        };
      }
    
      switchImage() {
        if (this.state.currentImage < this.state.images.length - 1) {
          this.setState({
            currentImage: this.state.currentImage + 1
          });
        } else {
          this.setState({
            currentImage: 0
          });
        }
        return this.currentImage;
      }
    
      componentDidMount() {
        setInterval(this.switchImage, 200);
      }

    render(){
        return(
                <div className="container" id="page">                   
                    <div className="container" id="brief">
                        <div className="brief-p"> 
                            <h2 className="section-heading"><b><i>Your Wish Is My Command</i></b></h2>               
                            <p>
                            By purchasing a MyCryptoWish Star, you are guaranteed to be granting the wishes of 
                            critically ill children by supporting the Make-A-Wish Foundation. 

 
                            </p>

                            <p>
                            While MyCryptoWish cannot guarantee that your personal wish comes true, research has 
                            shown that Make-A-Wish Wishes help improve and even save the lives of sick children, 
                            so your NFT will actively change the world for these kids and their families.

                            </p>
                        </div>
                        <div className="brief-img" style={{background: '#7C83FD'}}>
                            <div>
                                <img
                                className="switch-img"
                                width="90%"
                                style={{borderRadius: '20px'}}
                                src={this.state.images[this.state.currentImage]}
                                alt="cleaning images"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="container" id="team">
                        <div className="team-text">
                            <div className="heading team" >
                                <h2 className="section-heading"><b><i>The Team</i></b></h2>
                            </div>
                            {/* <div className="underline" id="team"></div>
                            <div className="sub-heading team" id="team">
                                <h5><b><i>Three college kids wanting to<br>
                                </br> learn more about NFTs and give back</i></b></h5>
                            </div> */}
                            <div className="creator" id="description">
                                <div className="creator-contianer">
                                    <Card style={{ background: '#FDD644', borderRadius: '12px'}}>
                                        <Card.Img variant="top" src={evan} />
                                        <Card.Body>
                                            <Card.Title style={{ color: '#0A0818'}}>@EvanGolinsky</Card.Title> 
                                            <Card.Title style={{ color: '#0A0818'}}>CEO</Card.Title>  
                                            
                                        </Card.Body>
                                        <div className="card-button">
                                            <Button style={{background: 'transparent', borderColor: 'transparent', width: '50%'}}><img className="card-img" src={instagram}/></Button>
                                            <Button href="https://www.linkedin.com/in/evangolinsky142/" style={{background: 'transparent', borderColor: 'transparent', width: '50%'}}><img className="card-img" src={linkedIn}/></Button>
                                        </div>
                                    </Card>
                                </div>
                                <div className="creator-contianer">
                                    <Card style={{ background: '#FDD644', borderRadius: '12px'}}>
                                        <Card.Img variant="top" src={zach} />
                                        <Card.Body>
                                            <Card.Title style={{ color: '#0A0818'}}>@Zachary_Lederman</Card.Title>
                                            <Card.Title style={{ color: '#0A0818'}}>CTO</Card.Title>
                                        </Card.Body>
                                        <div className="card-button">
                                            <Button style={{background: 'transparent', borderColor: 'transparent', width: '50%'}}><img className="card-img" src={instagram}/></Button>
                                            <Button href="https://www.linkedin.com/in/zachary-lederman/" style={{background: 'transparent', borderColor: 'transparent', width: '50%'}}><img className="card-img" src={linkedIn}/></Button>
                                        </div>
                                    </Card>
                                </div>
                                <div className="creator-contianer">
                                    <Card style={{ background: '#FDD644', borderRadius: '12px'}}>
                                        <Card.Img variant="top" src={seb} />
                                        <Card.Body>
                                            <Card.Title style={{ color: '#0A0818'}}>@BalthroJawns</Card.Title>
                                            <Card.Title style={{ color: '#0A0818'}}>CTO</Card.Title>
                                        </Card.Body>
                                        <div className="card-button">
                                            <Button href="https://www.instagram.com/sebmelendez/" style={{background: 'transparent', borderColor: 'transparent', width: '50%'}}><img className="card-img" src={instagram}/></Button>
                                            <Button href="https://www.linkedin.com/in/sebastian-melendez-56a7881b3/" style={{background: 'transparent', borderColor: 'transparent', width: '50%'}}><img className="card-img" src={linkedIn}/></Button>
                                        </div>
                                    </Card>
                                </div>
                                <div className="creator-contianer">
                                    <Card style={{ background: '#FDD644', borderRadius: '12px'}}>
                                        <Card.Img variant="top" src={christina} />
                                        <Card.Body>
                                            <Card.Title style={{ color: '#0A0818'}}>@Cristina_Gonzalez</Card.Title>
                                            <Card.Title style={{ color: '#0A0818'}}>Artist</Card.Title>
                                        </Card.Body>
                                        <div className="card-button">
                                            <Button style={{background: 'transparent', borderColor: 'transparent', width: '50%'}}><img className="card-img" src={instagram}/></Button>
                                            <Button style={{background: 'transparent', borderColor: 'transparent', width: '50%'}}><img className="card-img" src={linkedIn}/></Button>
                                        </div>
                                    </Card>
                                </div>

                            </div>
                        </div>                        
                    </div>

                    <div className = "container" id="gallery">
                        <div className="team-text">
                            <div className="heading gallery" >
                                <h2 className="section-heading"><b><i>The Gallery</i></b></h2>
                            </div>

                            <Carousel
                                show={3}
                                infiniteLoop={true}
                            >
                                <div>
                                    <div style={{padding: 8}}>
                                        <img className="gallertImage" src={einstein} alt="placeholder" style={{width: '100%'}} />
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img className="gallertImage" src={fireman} alt="placeholder" style={{width: '100%'}} />
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img className="gallertImage" src={ninja} alt="placeholder" style={{width: '100%'}} />
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img className="gallertImage" src={rainbow} alt="placeholder" style={{width: '100%'}} />
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img className="gallertImage" src={scuba} alt="placeholder" style={{width: '100%'}} />
                                    </div>
                                </div>
                            </Carousel>
                        </div>
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
                                            <li><b>Step 1:</b> Acquire Ethereum! (0.05 ETH) to make a wish</li>
                                            <li><b>Step 2:</b> Install Metamask (On supported Browser)</li>
                                            <li><b>Step 3:</b> Find Your Wallet Secret</li>
                                            <li><b>Step 4:</b> Load Your Wallet Secret Into Metamask</li>
                                            <li><b>Step 5:</b> Make your wish!</li> 
                                            {/* 5% for raffles */}
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
                </div>
              
        )

    }
}
export default AboutPage