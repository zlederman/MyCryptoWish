import {Tabs,Tab,Sonnet} from 'react-bootstrap';
import React, {Component, useRef} from 'react';
import "./purchase"

class AboutPage extends Component{
    render(){
        return(
        <Tabs defaultActiveKey="purchase" id="uncontrolled-tab-example">
        
        <Tab eventKey="purchase" title="Purchase Guide">
     
        </Tab>
        <Tab eventKey="about" title="About Us" disabled>

        </Tab>
        </Tabs>)
    }
}
export default AboutPage