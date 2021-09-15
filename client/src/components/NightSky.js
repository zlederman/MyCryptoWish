import React, {Component, useRef} from 'react';
import "../App.css"
class NightSky extends Component{
    state = {stars: []}
    componentDidMount = () =>{
        let elements = Array(500)
        for(let i = 0; i < 500;i ++){
            elements[i] = this.buildStar()
        }
        this.setState({stars: elements})
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
                animationDelay: duration+'s'
            }
        });
    }
    
    render() {
        return <div className="sky">
            {this.state.stars}
        
        </div>
    }
}
export default NightSky;