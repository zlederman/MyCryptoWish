import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useHistory } from "react-router-dom";

class AlertWeb3 extends React.Component {
    createNotification = () => {
        NotificationManager.error('Web3 Not Loaded', 'Learn How To Purchase', 5000, () => {
            alert('callback');
          });
    }

    routeChange = () => {
        let path = 'purchase-guide'
        let history = useHistory()
        history.push(path)
    }

    render(){
        return(
            <div>
                <button className="btn btn-danger" onClick={this.createNotification}>\
                    Error
                </button>
            </div>
        )
    }
    
}