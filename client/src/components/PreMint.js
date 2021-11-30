import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import React from "react";
import { TimerContainer } from "./rafflepage/rafflepage";
function PremintModal(){ 
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
  
    return (
      <>
        <Modal
          onHide={handleClose}
          show={show}          
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title><b>We are doing some work to make this project fantastic! check back in:</b></Modal.Title>
          </Modal.Header>

          <TimerContainer className="modal-timer"/>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            ]
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default PremintModal