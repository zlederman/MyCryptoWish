import {Nav,Navbar,Figure, Card} from 'react-bootstrap';
import React, {Component, useRef} from 'react';
import Carousel from "./gallerypage/gallerypage"
import einstein from "../assets/einstein.png"
import fireman from "../assets/Fireman.png"
import twitter from "./rafflepage/icons/iconmonstr-twitter-1.svg"
import discord from "./rafflepage/icons/Discord-Logo-Black.svg"
import instagram from "./rafflepage/icons/instagram.svg"
import linkedIn from "./rafflepage/icons/linkedin.svg"
import mcw from "../assets/MCW.png"


const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container" id="footer">
                <div className="row">
                    <div className="col">
                        <img  className="footer-logo" src={mcw}/>
                    </div>
                    <div className="col">
                        <a href="https://www.instagram.com/my_cryptowish/">
                        <img className="footer-svg" src={instagram}/>
                        </a>
                    </div>
                    <div className="col">
                        <a href="https://twitter.com/my_cryptowish">
                            <img className="footer-svg" src={twitter}/>
                        </a> 
                    </div>
                    <div className="col">
                        <a href="https://www.linkedin.com/company/mycryptowish/about/?viewAsMember=true">
                        <img className="footer-svg" src={linkedIn}/>
                        </a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm" style={{ color: 'white'}}>
                        {new Date().getFullYear()} MyCryptoWish LLC | All Rights Reserved | Terms Of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
        
    )
}

export default Footer