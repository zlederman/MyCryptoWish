import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import {TimerContainer} from "./rafflepage/rafflepage"

function PreSale(props){ 
    const [show, setShow] = useState(true);
    const [signature,setSignature] = useState("");
    const handleClose = () => setShow(false);
    
    const handleSubmit = async (e) => {
        evt.preventDefault();
        props.checkAddr(signture)
    }

    return (
      <>
        <Modal
          onHide={handleClose}
          show={show}          
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title><b>Check to see if you are on the white list!</b></Modal.Title>
          </Modal.Header>
        <Form>
            <Form.Group controlId="formWalletAddress">
            <Form.Label>Wallet Address</Form.Label>
            <Form.Control type="address" placeholder="0x..." onChange={e => setSignature(e)} />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
            </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSubmit}>
              Submit
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default Presale