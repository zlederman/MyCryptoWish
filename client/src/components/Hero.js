
import React, { Component } from "react";


class Hero extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
        this.visibilityRef = React.createRef();
        this.alterVisibility = this.alterVisibility.bind(this)
    }

    alterVisibility =() => {
        console.log("o")
        this.setState(prevState => ({
            visible: !prevState.visible
          }));
      
    }

    render(){
        return(
            <div className={(this.state.visible ? "fadeOut " : "fadeIn ") + "px-4 py-5 my-5 text-center"} ref={this.visibilityRef}>
            <img className="d-block mx-auto mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
            <h1 className="display-5 fw-bold"> Make A Wish Foundations NFT Offering</h1>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap,
               the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick = {this.alterVisibility}>Make A Wish</button>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">Purchase Guide</button>
              </div>
            </div>
          </div>
        )
    }
}

export default Hero;

