import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AddBook({ onCreate}) {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState({
    title: '',
    description:'',
    status: false,
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(event) {
    event.preventDefault();
    await onCreate(book);
    handleClose();

    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Book
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="AddBookFormTitle.ControlInput1" >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Book Title"
                  autoFocus
                  id="addBookFormTitle"  // Added the id attribute
                  value={book.title}  // Added the value attribute bound to the book state
                  onChange={(e) => setBook({ ...book, title: e.target.value })}  // Added the onChange event

                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="AddBookFormDescription.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="addBookFormDescription"  // Added the id attribute
                  value={book.description}  // Added the value attribute bound to the book state
                  onChange={(e) => setBook({ ...book, description: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Book
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


export default AddBook;