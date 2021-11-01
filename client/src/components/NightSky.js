import React, {Component, useRef} from 'react';
import grass from "../grass.png"
import well from "../well.png"
import moon from "../moon.png"
import cloud1 from "../cloud1.png"
import cloud2 from "../cloud2.png"
import cloud3 from "../cloud3.png"
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
        let size = Math.random() * 2;
        return React.createElement("i",{
            key: i,
            style:{
                left: x +"px",
                top: y + "px",
                width: 1 + size + "px",
                height: 1 + size +"px",
                animationDuration: 5 + duration+"s",
                animationDelay: duration+'s',
               
            }
        });
    }
    
    render() {
        return <div className="sky">
            <img  className="background" src={grass}/>
            <img className="moon" src={moon}/>
            <img  className ="cloud-one cl" src={cloud1}/>
            <img  className ="cloud-two cl" src={cloud2}/>
            <img  className ="cloud-three cl" src={cloud3}/>
            <img  className ="cloud-four cl" src={cloud1}/>
            <img className="well" src={well}/>
            {this.state.stars}
        </div>
    }
}
export default NightSky;