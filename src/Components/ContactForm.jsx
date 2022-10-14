import React, {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const ContactForm = (props) => {
  const [validated, setValidated] = useState(false);
  const { form, setForm, onSubmit, onHide } = props

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity()) {
      onSubmit();
      onHide();
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} onShow={() => setValidated(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Formulario de Contacto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formContorlName">
            <Form.Label column sm={4}>Identificación:</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="dni" value={form.dni} onChange={e => handleChange(e)} required />
              <Form.Control.Feedback type="invalid">
                Campo requerido.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formContorlName">
            <Form.Label column sm={4}>Nombre:</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Campo requerido.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formControlLastName">
            <Form.Label column sm={4}>Apellido:</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="lastname" value={form.lastname} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Campo requerido.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formContorlEmail">
            <Form.Label column sm={4}>Correo:</Form.Label>
            <Col sm={8}>
              <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Campo requerido. Debe ser un correo valido.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formControlLastName">
            <Form.Label column sm={4}>Celular:</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Campo requerido.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formContorlEmail">
            <Form.Label column sm={4}>Dirección:</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="address" value={form.address} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Campo requerido.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formControlLastName">
            <Form.Label column sm={4}>Cargo:</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="jobtitle" value={form.jobtitle} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Campo requerido.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 8, offset: 4 }}>
              <Button variant="secondary" className="mx-2" type="reset" onClick={props.onHide}>Cancelar</Button>
              <Button variant="primary" className="mx-2" type="submit">Guardar</Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ContactForm;
