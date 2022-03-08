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
import aboutConfig from "../assets/team.json"


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

                    <div className="container" id="countdown">
                        <h2 className='section-heading-count'> Raffle Goes Live At 10k On Discord! </h2>
                    </div>
                    <div className="container" id="brief">
                        <div className="brief-p"> 
                            <h2 className="section-heading"><b><i>Hope for a Brighter Future Starts With a Wish</i></b></h2>               
                            <p>
                            MyCryptoWish Star ownership comes with a promise of transparent charitable giving and membership in
                            a community of altruistic NFT holders seeking to revolutionize philanthropy through blockchain technology. 
                            </p>

                            <p>
                            While MyCryptoWish cannot guarantee that your personal wish comes true, we guarantee that your wish will 
                            help grant the wish of health for critically-ill children around the world by directly supporting St. 
                            Jude’s mission to end childhood cancer.
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
                            <div className="creator" id="description">
                            <TeamCard name={evan} about={aboutConfig.evan}></TeamCard>
                            <TeamCard name={zach} about={aboutConfig.zach}></TeamCard>
                            <TeamCard name={seb} about={aboutConfig.seb}></TeamCard>
                            <TeamCard name={christina} about={aboutConfig.cristina}></TeamCard>
                             </div>        
                            {/* <div className="underline" id="team"></div>
                            <div className="sub-heading team" id="team">
                                <h5><b><i>Three college kids wanting to<br>
                                </br> learn more about NFTs and give back</i></b></h5>
                            </div> */}
                        
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
                                            <li><b>Step 1:</b> Join Discord</li>
                                            <li><b>Step 2:</b> Install Metamask (On supported Browser)</li>
                                            <li><b>Step 3:</b> Enter Raffle</li>
                                            <li><b>Step 4:</b> Make your wish!</li> 
                                            {/* 5% for raffles */}
                                        </ul>
                                    </div>
                            </div>
                        </div>
                        <div className="links">
                            <div className="link" id="coinbase">
                                <a className="hyperlink"href="https://discord.gg/5YF2mChwkR"><b>Join Discord</b></a>
                            </div>
                            <div className="link" id="metamask">
                                <a className="hyperlink"href="https://metamask.io/"><b>Metamask</b></a>
                            </div>
                        </div>
                    </div>
                </div>
              
        )

    }
}


class TeamCard extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
        <div className="creator-contianer">
        <Card style={{ background: '#FDD644', borderRadius: '12px'}}>
            <Card.Img variant="top" src={this.props.name}  />
            <Card.Body>
                <Card.Title style={{ color: '#0A0818' }}>@{this.props.about.handle}</Card.Title> 
                <Card.Text style={{ color: '#0A0818'}}>{this.props.about.position}</Card.Text>  
            </Card.Body>
         
        </Card>
    </div>
    )
    }
}


export default AboutPage