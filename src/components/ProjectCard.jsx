import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import {Row,Col} from 'react-bootstrap'
import { useState } from 'react';
import server_url from '../services/server_url'

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card className='rounded' style={{ width: '18rem' }}>
                <Card.Img onClick={handleShow} className='rounded' style={{height:"200px"}} variant="top" src={project.image?`${server_url}/uploads/${project.image}`:"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/08/Empire-Flippers-an-online-business-marketplace-1024x564.webp" }/>
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>


                </Card.Body>
            </Card>
  
            
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project1</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Row>
            <Col>
               <img  className='img-fluid rounded' style={{height:"200px"}} src={project.image?`${server_url}/uploads/${project.image}`:"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/08/Empire-Flippers-an-online-business-marketplace-1024x564.webp" } alt="" />
            </Col>

            <Col>
              <h4>{project.title}</h4>
              <p>{project.overview}</p>
              <h6>{project.language}</h6>
              <div className='mt-3 d-flex justify-content-evenly'>
                <a href={project.github}>
                <i className="fa-brands fa-github fa-xl"></i>
                </a>
                <a href={project.demo}>
                <i className="fa-solid fa-link fa-xl"></i>
                </a>
              </div>
            </Col>
           </Row>
        </Modal.Body>
       
      </Modal>
        </>
    )
}

export default ProjectCard