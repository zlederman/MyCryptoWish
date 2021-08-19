import React, {Component, useRef} from 'react';

class NightSky extends Component{
    constructor() {
        super();
        this.state.children = this.stars();
    }
    stars = () =>{
        return Array.apply(null,Array(500).map(this.buildStar())); 
      }
    buildStar = () => {
        let star = document.createElement("i");
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        let duration = Math.random() * 10;
        let size = Math.random() * 2;

        star.style.left = x +"px";
        star.style.top = y +"px";
        star.style.width = 1 + size +"px";
        star.style.height = 1 + size +"px";

        star.style.animationDuration = 5 + duration+"s";
        star.style.animationDelay = duration+'s'
        return star;
    }
    render() {
        return <div className="stars-bg">
                {this.stars()}
        </div>
    }
}
export default NightSky;