import {Nav,Navbar,Figure, Card} from 'react-bootstrap';
import React, {Component, useRef} from 'react';
import ProgressBar from './ProgressBar';
import Carousel from "./gallerypage/gallerypage"
import einstein from "../assets/einstein.png"
import fireman from "../assets/Fireman.png"
import ninja from "../assets/ninja.png"
import rainbow from "../assets/rainbow.png"
import seb from "../assets/seb.png"


class introPage extends Component{


    render(){
        return(
                <div className="container" id="page">                   
                    <div className="container" id="intro">
                        <div className="intro-p"> 
                            <h2 className="section-heading"><b><i>NFTs with a purpose</i></b></h2>               
                            <p>
                            
                            The MyCryptoWish Stars are 10,000 unique digital collectibles shooting across the Ethereum 
                            blockchain. Each Star is set in motion by making a personal wish and comes with a promise 
                            to positively change the world.

 
                            </p>
                        </div>
                    </div>
                </div>
              
        )

    }
}
export default introPage